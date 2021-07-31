#!/bin/bash

output=$(sudo systemctl status bluetooth.service)

if [[ $output == *'Status: "Running"'* ]]; then
  echo 1
fi

if [[ $output == *'Status: "Quitting"'* ]]; then
  echo 0
fi