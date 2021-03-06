import socketserver
from http.server import HTTPServer
from threading import Thread
import sys
from server.StreamingHttpHandlerCamera import StreamingHttpHandlerCamera
from server.BluetoothServer import BluetoothServer
import time
HTTP_PORT = 8080

class StreamingServer(socketserver.ThreadingMixIn, HTTPServer):
    allow_reuse_address = True
    daemon_threads = True

def main():
    try:
        http_server = StreamingServer(('', HTTP_PORT), StreamingHttpHandlerCamera)
        bluetooth = BluetoothServer()
        bluetooth_thread = Thread(target = bluetooth.run_server)
        bluetooth_thread.daemon = True
        print("Starting Bluetooth server")
        bluetooth_thread.start()
        print ('Starting httpserver on port ' , HTTP_PORT)
        http_server.serve_forever()
        
    except KeyboardInterrupt:
        print("keyBoard from setup")
        
    finally:
        print("shutdown http_server")
        http_server.socket.close()
        sys.exit() 

        
if __name__ == '__main__':
    main()
