- Starting off as this was a new PC I did this assignment on I had to reinstall Git, Node.JS, Docker, Kubernetes + Kubectl and MongoDB and it's accompanying software
- Activate Kubernetes in Docker to create a local cluster
- Create a Cluster in MongoDB Atlas and create a MongoDB User
- Following that, I made 3 mongo.yaml files, mongo-deployment.yaml, mongo-servive.yaml and mongo-storage.yaml (these have been included in the upload. so you can view what I wrote)
- I was using Powershell so for this step the generate secret command is different compared to command prompt
I had input a different USERNAME= and PASSWORD= than what's provided below
"kubectl create secret generic mongo-secret --from-literal=MONGO_INITDB_ROOT_USERNAME=user --from-literal=MONGO_INITDB_ROOT_PASSWORD=password"
After which I ran kubectl apply -f .\ for the provided .yaml files
After having done that, I connected the index.js to MongoDB when I use the node index.js command and included basic CRUD commands,

http://localhost:3040/divide?n1=5&n2=5 for performing the basic calculation
http://localhost:3040/deleteResult?n1=5&n2=5&operation=divide for deleting that basic calculation record from MongoDB
http://localhost:3040/updateResult?n1=5&n2=5&operation=divide&newResult=2.5 for updating the result of the calculation record from 5/5 = 1 to 5/5 = 2.5

Despite issues with free cluster I was able to perform a backup to my local SSD using the commands

$timestamp = Get-Date -Format "yyyy-MM-dd"
$uri = "mongodb+srv://projectuser:<db_password>@cluster0.pioxtf6.mongodb.net/"
$outDir = "C:\Backups\mongo-backup-$timestamp"

mongodump --uri=$uri --out=$outDir
