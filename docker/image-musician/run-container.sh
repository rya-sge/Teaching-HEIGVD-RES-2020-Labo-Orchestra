#!/bin/bash
docker kill musicien
docker run   --name="musicien" res/musician piano
