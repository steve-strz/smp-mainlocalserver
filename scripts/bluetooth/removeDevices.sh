#!/bin/bash

for device in $(bluetoothctl devices | grep -o "[[:xdigit:]:]\{8,17\}"); do

	paired=false

	for pairedDevice in $(bluetoothctl paired-devices | grep -o "[[:xdigit:]:]\{8,17\}"); do
		if [ $device = $pairedDevice ]; then
			paired=true
		fi
	done

	if [ "$paired" = false ]; then
		echo "removing bluetooth device : $device | $(bluetoothctl remove $device)"
	fi
done 