# import the 'website' package > grab the 'app' function
from website import create_app

# make an instance
app = create_app()

if __name__ == '__main__':
   # run the Flask application, start the web server, & debug=True means everytime there is a change in the Phyton code, it will re-run the web server
   app.run(debug=True)