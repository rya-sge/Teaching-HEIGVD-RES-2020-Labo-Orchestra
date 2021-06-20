#!/bin/bash
docker kill auditor
docker system prune
docker run  --name="auditor" -d -p 2205:2205 res/auditor
docker inspect auditor | grep IPAddress

