# Support API Server#

### Requirements ###

pre-tickets ie- inbound requests

 * create
 * list


tickets

 * build from pre-tickets 
 
 
TODO:   

slugify. kue
create connection polling to ticket api.  
create logic to automatically read inbound data, and call ticket api.
if 200, delete.
else set update time of inbound and save.


valid:

http://127.0.0.1:8080/inbound/create/?some=what&type=call
http://127.0.0.1:8080/inbound/create/sms/?some=what


### discarded / delayed as of now

#### user ####
 - create ticket
 - track ticket
 - set status

#### assigned ####
 - reply
 - set status
 - re-assign

#### webhooks ####
 - new ticket
 - ticket status change
 - assignment change