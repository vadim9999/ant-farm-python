import io
import logging
from threading import Condition
import picamera
from time import sleep
import subprocess
import os
import signal
import json 

class StreamingOutput(object):
    def __init__(self):
        self.frame = None
        self.buffer = io.BytesIO()
        self.condition = Condition()

    def write(self, buf):
        if buf.startswith(b'\xff\xd8'):
            # New frame, copy the existing buffer's content and notify all
            # clients it's available
            self.buffer.truncate()
            with self.condition:
                self.frame = self.buffer.getvalue()
                self.condition.notify_all()
            self.buffer.seek(0)
        return self.buffer.write(buf)



class Streaming():
    connectedClients = 0
    startedPreview = False
    startedStream = False
    counter = 0
    users = []
    stoppedUserId = 0
    width = 640
    height = 480
    deleteUsers = False
    splitter_port = False
    connectedUserId = 0
    youtube = ""
    key = ""
    # getters and setters
    def isStartedPreview(self):
        return self.startedPreview
    def test(self):
        return "In test streaming"
    def getCamera(self):
        return self.camera

    def isStartedStream(self):
        return self.startedStream
        
    def getConnectedUserId(self):
        return self.connectedUserId
    # ------------------
    def startCamera(self, resolution1):
        print("resolution in Camera")
        print(resolution1)
        self.camera = picamera.PiCamera(resolution=resolution1, framerate=24)
        self.output = StreamingOutput()

# *********Preview***********
    def startPreview(self,selfed,user_Id):
        # ----------------------
        # cookie
        # C = http.cookies.SimpleCookie(selfed.headers["Cookie"])
        # userId = C['user_id'].value
        # print(userId)
        # -------------------

        # global connectedClients
        if(self.startedPreview == True):
            selfed.send_response(200)
            selfed.send_header('Age', 0)
            selfed.send_header('Cache-Control', 'no-cache, private')
            selfed.send_header('Pragma', 'no-cache')
            selfed.send_header('Content-Type', 'multipart/x-mixed-replace; boundary=FRAME')
            selfed.end_headers()
            sleep(1)
            self.camera.wait_recording(1)

            self.connectedClients = self.connectedClients + 1
            self.users.append(user_Id)
            print("users")
            print(str(self.connectedClients))

            # global streaming
            # streaming = True
            try:
                print("try and below while")
                while (user_Id != self.stoppedUserId):
                    try:
                        with self.output.condition:
                            self.output.condition.wait()
                            frame = self.output.frame
                    except Exception as e:
                        print("!!!!exception " + str(e))

                    selfed.wfile.write(b'--FRAME\r\n')
                    selfed.send_header('Content-Type', 'image/jpeg')
                    selfed.send_header('Content-Length', len(frame))
                    selfed.end_headers()
                    selfed.wfile.write(frame)
                    selfed.wfile.write(b'\r\n')
                self.stoppedUserId = 0
                self.connectedClients = self.connectedClients - 1
                if self.deleteUsers == True :
                    self.users.remove(user_Id)
                print("******continue execute code")
                selfed.wfile.write(b'--FRAME\r\n')
                selfed.send_header('Content-Type', 'image/jpeg')
                selfed.send_header('Content-Length', len(b''))
                selfed.end_headers()
                selfed.wfile.write(b'')
                selfed.wfile.write(b'\r\n')

            except Exception as e:
                self.connectedClients = self.connectedClients - 1
                logging.warning(
                    'Removed streaming client %s: %s',
                    selfed.client_address, str(e))
            finally:
                print("Stopping camera")
                if (self.connectedClients == 0):
                    print("O users")
                    print(str(self.connectedClients))
                    self.startedPreview = False
                    if self.splitter_port == True:
                        self.camera.stop_recording(splitter_port=2)
                        self.splitter_port = False
                    else:
                        self.camera.stop_recording()
                        self.camera.close()

        else:
            selfed.send_response(200)
            selfed.end_headers()

    def startRecording(self, resolution):
        if self.startedStream == True:
            self.splitter_port = True

        if self.splitter_port == True:
            print("______splitter_port = true_____")
            self.camera.start_recording(self.output, splitter_port=2, format = 'mjpeg', resize=resolution)
            print("________started recording_______")
            print(resolution)
            self.startedPreview = True
        else:
            if(self.startedPreview == False):
                self.startCamera(resolution)
                self.camera.start_recording(self.output, format='mjpeg')
                self.startedPreview = True
        print("startedPreview")
        print(self.startedPreview)


    def stopRecording(self,userID = 0, stopPreviewAllUsers = False):
        if(stopPreviewAllUsers == True):
            self.deleteUsers = False
            for user in self.users:
                print("______user________")
                print(user)
                self.stoppedUserId = user
                sleep(2)
            self.users.clear()
        else:
            self.deleteUsers = True
            print("____________else userID")
            print("userID")
            print(userID)
            self.stoppedUserId = userID
    
    

# *************Stream***************
    def startRecordingStream(self):
        try:
            print("_______start recording stream__________")
            while self.startedStream == True:
                self.camera.wait_recording(1)
            print("____Executing after while____")
        except Exception as e:
            print("Exception")
        finally:
            print("____Block finally___")
            print("____Stopping camera___")
            self.camera.stop_recording()
            print("___Stopped recording_____")
            self.camera.close()
            print("_____camera was closed_____")
            os.killpg(os.getpgid(self.stream_pipe.pid), signal.SIGTERM)
            self.startedStream = False
            # self.stream_pipe.stdin.kill()
            # os.kill(self.stream_pipe, signal.SIGKILL)
#             pid = self.stream_pipe.pid
#             self.stream_pipe.terminate()
#
# # Check if the process has really terminated & force kill if not.
#             try:
#                 os.kill(pid, 0)
#                 self.stream_pipe.kill()
#                 print ("Forced kill")
#             except OSError as e:
#                 print ("Terminated gracefully")

            # print("_____pipe was terminated___")
            # self.stream_pipe.stdin.close()
            # print("___closed_pipe____")
            # self.stream_pipe.wait()
            # print("___waiting to close pipe____")
        print("Done")

        
    def setYoutubeKey(self, youtube, key):
        print("In setYoutube")
        print(youtube)
        print(key)
        self.youtube = youtube
        self.key = key

    def getYoutubeKey(self):
        data = {
            "youtube": self.youtube,
            "key": self.key
        }
        
        return json.dumps(data)
        # return "{\"" + "youtube\":\"" + self.youtube + "\", " + "\"key\":\"" + self.key + "\"}"
    
    def startStream(self, userID = 0, resolution1 = "640x480"):
        if self.startedStream != True and userID != 0:
            self.connectedUserId = userID
            stream_cmd = 'ffmpeg -f h264 -r 25 -i - -itsoffset 5.5 -fflags nobuffer -f lavfi -i anullsrc -c:v copy -c:a aac -strict experimental -f flv ' + self.youtube + "/" + self.key
            self.stream_pipe = subprocess.Popen(stream_cmd, shell=True, stdin=subprocess.PIPE, preexec_fn=os.setsid)
            print("_____setting pipe_____")
            self.startCamera(resolution1 = resolution1)
            print("___________Started Camera_______")
            # self.camera.framerate = 25
            self.camera.vflip = True
            self.camera.hflip = True
            print("______After Settingup___")
            self.camera.start_recording(self.stream_pipe.stdin, format='h264', bitrate = 20000000)

            print("__________AfterStartRecording")
            self.startedStream = True
            self.startRecordingStream()

        

        # self.startPreview(selfed, userID)

    def stopStream(self):
        print("___________StopStream_______________")
        self.startedStream = False
        # self.camera.stop_recording()
        # self.camera.close()
        # self.startCamera()

        # if self.startedPreview == True and self.startedStream == False:
        #     self.startedPreview = False
        #     self.camera.stop_recording()
        #     self.camera.close()
        #     self.startCamera()
