#!/bin/bash
sudo docker kill m1
sudo docker kill m2
sudo docker kill m3
sudo docker kill m4
sudo docker system prune
docker run --name="m1" -d res/musician piano
docker run --name="m2" -d res/musician flute
docker run --name="m3" -d res/musician flute
docker run --name="m4" -d res/musician drum
