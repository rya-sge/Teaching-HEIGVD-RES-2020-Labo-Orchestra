#!/bin/bash
docker kill auditor
docker system prune
docker run   -p 2205:2205 res/auditor --name="auditor"

