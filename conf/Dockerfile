FROM ubuntu:14.04

RUN apt-get update
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install -y nodejs
RUN apt-get install -y build-essential
RUN npm install -g yarn@1.10.0
RUN yarn global add ionic@3.20.0
RUN yarn global add cordova
RUN yarn install --no-bin-links

# Set environment variables.
ENV HOME /root

# Define working directory.
WORKDIR /root

# Define default command.
CMD ["bash"]