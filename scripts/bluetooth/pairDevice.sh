#!/usr/bin/expect -f

set prompt "#"
set address [lindex $argv 0]

spawn sudo bluetoothctl
expect -re $prompt
send "pair $address\r"
send_user "\nPairing device with $address mac address\r"
sleep 10
send_user "\nDevice should be paired now\r"

