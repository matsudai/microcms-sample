FROM node:18.12.1-bullseye-slim

#
# Install utilities.
#
RUN apt update && \
    apt install -y \
        locales \
        git vim curl && \
    apt clean && rm -rf /var/lib/apt/lists/*

#
# Locale = C.UTF-8
# # Locale = ja_JP.UTF-8
#
ENV LANG C.UTF-8
# RUN locale-gen ja_JP.UTF-8 && \
#     localedef -f UTF-8 -i ja_JP ja_JP.UTF-8
# ENV LANG ja_JP.UTF-8

USER node

EXPOSE 3000
