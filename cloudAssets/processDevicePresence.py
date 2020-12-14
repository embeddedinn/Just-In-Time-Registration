import json
import logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)
import boto3

client = boto3.client('iot-data')

def handler(event, context):
    logger.info(event)
    clientId=event["clientId"]
    state=event["eventType"]
    online=False
    
    if "disconnected"==state:
        shadow={"state":{"reported":{"online":False,"LED":False}}}
    elif "connected"==state:
        shadow={"state":{"reported":{"online":True}}}

    
    
    
    response = client.update_thing_shadow(thingName=clientId, payload=json.dumps(shadow))
    if 200 == response["ResponseMetadata"]["HTTPStatusCode"]:
        return True
    else:
        return False
