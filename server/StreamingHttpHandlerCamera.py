import io
from http.server import BaseHTTPRequestHandler
from os import curdir, sep
from string import Template
from time import sleep
import urllib.parse as urlparse
from .Streaming import Streaming
from .RecordVideo import RecordVideo
from .CaptureImage import CaptureImage
from .ControlServo import ControlServo
from .Sensors import Sensors
from os import listdir
from os.path import isfile, join
import os
import shutil
import json
from subprocess import call

CORS = True

counter = 0
connectedUsers = []


class StreamingHttpHandlerCamera(BaseHTTPRequestHandler):
    stream = Streaming()
    recordVideo = RecordVideo()
    captureImage = CaptureImage()
    sensors = Sensors()
    feeder = ControlServo()

    def do_OPTIONS(self):
        print("Options")
        allow = 'GET, PUT, UPDATE, DELETE, OPTIONS'
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')  # for CORS
        self.send_header('Access-Control-Allow-Headers', '*')  # for CORS
        self.send_header('Access-Control-Allow-Methods', allow)
        self.send_header('Allow', allow)
        self.end_headers()
        return

    def do_HEAD(self):
        self.do_GET()

    def do_POST(self):
        url_parts = list(urlparse.urlparse(self.path))
        self.path = url_parts[2]
        query = dict(urlparse.parse_qsl(url_parts[4]))
        userId = 0

        if len(query) != 0:
            userId = int(query["id"])
            print(query["id"])

        if self.path == "/start_record":

            self.send_response(200)
            if(CORS):
                self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            data = self.rfile.read(int(self.headers['Content-Length']))
            data = str(data.decode("utf-8"))
            data = json.loads(data)
            camera = self.stream.getCamera()
            self.recordVideo.startRecording(
                data["filename"], data["resolution"], True, camera, userId)
            return

        if self.path == "/capture_image":
            self.send_response(200)
            if(CORS):
                self.send_header("Access-Control-Allow-Origin", "*")

            self.end_headers()
            camera = self.stream.getCamera()
            data = self.rfile.read(int(self.headers['Content-Length']))
            data = str(data.decode("utf-8"))
            data = json.loads(data)
            self.captureImage.takeImage(
                data["filename"], data["resolution"], camera, True)
            return

        if self.path == "/start":
            self.send_response(200)
            if(CORS):
                self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            resolution = str(self.rfile.read(
                int(self.headers['Content-Length'])).decode("utf-8"))
            self.stream.startRecording(resolution)
            return
            # self.wfile.write("ok".encode('utf-8'))

        if self.path == '/start_stream':
            self.send_response(200)
            if(CORS):
                self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            # self.wfile.write("hello".encode('utf-8'))
            self.stream.stopRecording(stopPreviewAllUsers=True)
            resolution = str(self.rfile.read(
                int(self.headers['Content-Length'])).decode("utf-8"))
            self.stream.startStream(userID=userId, resolution1=resolution)
            print("****start streaming")
            return

        if self.path == '/set_stream_settings':
            self.send_response(200)
            if(CORS):
                self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            data = str(self.rfile.read(
                int(self.headers['Content-Length'])).decode("utf-8"))
            settings = json.loads(data)
            self.stream.setYoutubeKey(settings["youtube"], settings["key"])
            self.wfile.write(data.encode('utf-8'))
            return

        if self.path == "/set_settings_feeder":
            self.send_response(200)
            if(CORS):
                self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            data = self.rfile.read(int(self.headers['Content-Length']))
            data = int(data.decode("utf-8"))
            time = data * 86400
            self.feeder.resetfeedAfter()
            self.feeder.feedAfter(time)
            return

    def do_GET(self):

        if self.path == "/get_user_id":
            self.send_response(200)
            if(CORS):
                self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            global counter
            counter = counter + 1
            connectedUsers.append(counter)
            self.wfile.write(str(counter).encode('utf-8'))
            return

        # if self.path == '/':
            # print("call")
            # self.send_response(301)
            # self.send_header('Location', '/index.html')
            # self.end_headers()
            # if self.path == '/':

            # self.path = 'static/index.html'
            # self.send_response(301)
            # if(CORS):
            # self.send_header("Access-Control-Allow-Origin", "*")

            # global counter
            # counter = counter + 1

            # self.send_header('Location', '/index.html?id='+str(counter))
            # self.end_headers()
            # return

        if self.path == '/sensors':
            content_type = 'text/html; charset=utf-8'

            connectedId = 0
            startedStreaming = False
            if self.stream.isStartedStream() == True:
                startedStreaming = self.stream.isStartedStream()

            if self.recordVideo.isStartedRecording() == True and self.stream.isStartedPreview() == True:
                connectedId = self.recordVideo.getConnectedUserId()

            content = (self.sensors.getSensorsData(
                connectedId, startedStreaming)).encode('utf-8')
            self.send_response(200)
            if(CORS):
                self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header('Content-Type', content_type)
            self.send_header('Content-Length', len(content))
            self.end_headers()
            self.wfile.write(content)
            return

        url_parts = list(urlparse.urlparse(self.path))
        self.path = url_parts[2]
        query = dict(urlparse.parse_qsl(url_parts[4]))
        userId = 0

        if url_parts[2].startswith('/download') == True:
            urls = url_parts[2].split("/")

            filepath = "media/" + urls[2]
            with open(filepath, 'rb') as f:
                self.send_response(200)
                if(CORS):
                    self.send_header("Access-Control-Allow-Origin", "*")
                self.send_header(
                    "Content-Type", 'application/octet-stream')
                self.send_header(
                    "Content-Disposition", 'attachment; filename="{}"'.format(os.path.basename(filepath)))
                fs = os.fstat(f.fileno())
                self.send_header("Content-Length", str(fs.st_size))
                self.end_headers()
                shutil.copyfileobj(f, self.wfile)
            return

        if url_parts[2].startswith('/delete') == True:
            self.send_response(204)
            if(CORS):
                self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            urls = url_parts[2].split("/")
            filepath = "media/" + urls[2]

            if os.path.exists(filepath):
                os.remove(filepath)
            else:
                print("The file does not exist")
            return

        if len(query) != 0:
            userId = int(query["id"])

            # if self.path == "/index.html":
            #     self.path = 'static/index.html'

            # -----------feeder-----------------
        if self.path == "/feed":
            self.send_response(200)
            if(CORS):
                self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.feeder.feed()
            return

            # ------------stream------------------
        if self.path == '/stream_settings':
            print("streamSettings")
            self.send_response(200)
            if(CORS):
                self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            data = self.stream.getYoutubeKey()
            self.wfile.write(data.encode('utf-8'))
            return

        if self.path == "/stop_stream":
            self.send_response(200)
            if(CORS):
                self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.stream.stopRecording(stopPreviewAllUsers=True)
            self.stream.stopStream()
            return
            # self.wfile.write("ok".encode('utf-8'))

            # ----------record------------------------
        if self.path == "/stop_record":
            self.send_response(200)
            if(CORS):
                self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            camera = self.stream.getCamera()
            self.recordVideo.stopRecording(camera)
            return
            # self.wfile.write("ok".encode('utf-8'))

            # -----------media-----------------
        if self.path == "/media":
            content_type = 'text/html; charset=utf-8'
            mypath = "./media/"
            fileNames = [f for f in listdir(mypath) if isfile(join(mypath, f))]
            if len(fileNames) > 0:
                fileNames = str(fileNames)
            else:
                fileNames = ""

            content = fileNames.encode("utf-8")
            self.send_response(200)
            if(CORS):
                self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header('Content-Type', content_type)
            self.send_header('Content-Length', len(content))
            self.end_headers()
            self.wfile.write(content)
            return

        # shtdown & reboot RPI
        if self.path == "/shutdown_pi":
            self.send_response(200)
            if(CORS):
                self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            call("sudo shutdown -h now", shell=True)
            return

        if self.path == "/reboot_pi":
            self.send_response(200)
            if(CORS):
                self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            call("sudo reboot", shell=True)
            return

            # --------preview--------
        if self.path == "/stop":
            self.send_response(200)
            if(CORS):
                self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            if(userId != 0):
                self.stream.stopRecording(userID=userId)
            return

        if self.path == '/wait_start_preview':
            self.send_response(200)
            if(CORS):
                self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            while True:
                if self.stream.startedStream == True:
                    break
                sleep(1)
            return
            # self.wfile.write("ok".encode('utf-8'))
            # --------------------------------

        if self.path == '/is_streaming':
            self.send_response(200)
            if(CORS):
                self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(str(self.stream.startedStream).encode('utf-8'))
            print(self.stream.startedStream)
            return

        if self.path == '/stream.mjpg':
            if userId != 0:
                self.stream.startPreview(self, userId)
            return

        self.send_error(404)
        self.end_headers()
