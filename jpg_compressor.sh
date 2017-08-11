#!/bin/sh

for file in *.JPG
do
	echo "working on $file"
	guetzli --quality 90 $file compressed/$file
done

for file in *.jpg
do
	echo "working on $file"
	guetzli --quality 90 $file compressed/$file
done
