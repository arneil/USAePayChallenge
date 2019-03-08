#!/usr/bin/env bash

curl -X GET https://sandbox.usaepay.com/api/v2/customers/<CUST_KEY>/payment_methods/<PM_KEY>/cardref -H 'authorization: Basic X3IxeUM2MEJCbkNFMzAxRm9oakw0c2gwRTB0NW51c3U6czIva2VOREF1cDRSQ2xtSk5XTi9iNWM2MmVhYmYwZDQyNGNmOTIyZTlmZWFlOWMxNmI1MzEzMTAzYWUwYzliMTI2MjVkNjk4MWNlYjA5NGI0ODY5' -H 'content-type: application/json'
