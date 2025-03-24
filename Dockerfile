FROM python:3.13-bullseye

# Install tightvncserver and xfce4
RUN apt-get update && apt-get install -y tightvncserver xfce4 xorg xfce4-goodies

# Force install firefox using PPA (not snap)
RUN apt-get install -y software-properties-common
RUN add-apt-repository ppa:mozillateam/firefox-next
RUN apt-get update
RUN apt-get install -y firefox

# Install python packages
COPY poetry.lock, pyproject.toml /CrawJUD/

WORKDIR /CrawJUD

RUN pip install poetry
RUN poetry config virtualenvs.create false
RUN poetry install --without dev

# Set up VNC

# Set up VNC password
RUN mkdir -p ~/.vnc
RUN echo "password" | vncpasswd -f > ~/.vnc/passwd
RUN chmod 600 ~/.vnc/passwd

# Set up VNC startup script
RUN echo "#!/bin/bash" > ~/.vnc/xstartup
RUN echo "xrdb /etc/X11/Xresources" >> ~/.vnc/xstartup
RUN echo "startxfce4 &" >> ~/.vnc/xstartup
RUN chmod +x ~/.vnc/xstartup

# Expose VNC port
EXPOSE 5999

# Start VNC server
CMD ["vncserver", ":99", "-geometry", "1920x1080", "-depth", "24"]

