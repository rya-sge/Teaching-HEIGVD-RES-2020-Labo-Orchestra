#!/bin/bash
sudo docker kill musicien
sudo docker run   --name="musicien" res/musician piano
