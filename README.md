# Kubernetes project 
This Kubernetes project was edited by **Mr. Nicolas Muller** in parallel with the [Treeptik](https://treeptik.gitbook.io/k8s/fundamentals/orchestration) learning platform.
## Student informations

**Firstname :** Charley
**Lastname :** GEOFFROY
**Filiere :** DO3
**Year :** 2022-2023
## Table of contents

## How it works

This project is a Kubernetes project that will be used to deploy a frontend, a backend and a database. The frontend will be a SSR application using [Next.js](https://nextjs.org/), the backend will be a REST API using [Express](https://expressjs.com/) and the database will be a [Postgres](https://www.postgresql.org/) database.

A CI github actions is configured to build the docker images and push them to the github registry. The images are then pulled from the registry and deployed on the Kubernetes cluster.

## Images build by the CI

- [charley-kube-frontend](https://github.com/do3-2023/charley-kube/pkgs/container/charley-kube-frontend)
- [charley-kube-backend](https://github.com/do3-2023/charley-kube/pkgs/container/charley-kube-backend)


## Install kind

```bash
[ $(uname -m) = x86_64 ] && curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.20.0/kind-$(uname)-amd64
chmod +x ./kind
sudo mv ./kind /usr/local/bin/kind
```
Add autocomplete to kind by editing your `~/.bashrc` file and adding the following line:

```bash
source <(kind completion bash)
```
## Create cluster

```bash
kind create cluster tp-kube
```

## Create all namespaces needed

For each namespace you want to create, you can use the following command (frontend, backend, db):

```bash
kubectl create namespace <namespace>
```

## Create dry-run deployments

For each deployment you want to create, you can adapt the following command in the appropriate working directory, this will create a deployment.yaml file that you can adapt and apply:

```bash
kubectl create deploy <deployment-name> --image=<image> -n <namespace-required> --dry-run=client -o yaml > deployment.yaml
```

## Create dry-run services

For each service you want to create, you can adapt the following command in the appropriate working directory, this will create a `service.yaml` file that you can adapt and apply:

```bash
kubectl create service <service-type> <service-name> --tcp=<port>:<port> -n <namespace-required> --dry-run=client -o yaml > service.yaml
```

## Create dry-run secret 

For each secret you want to create, you can adapt the following command in the appropriate working directory, this will create a `secret.yaml` file that you can adapt and apply:

```bash
kubectl create secret generic <secret-name> --from-literal=<key>=<value> -n <namespace-required> --dry-run=client -o yaml > secret.yaml
```
# Run the project
## Apply and delete all kubernetes objects

From the working directory, you can apply this command to apply all kubernetes objects:

```bash
kubectl apply -R -f infra/
```

You can also delete all kubernetes objects:

```bash
kubectl delete -R -f infra/
```

To apply specific objects, you can use the following command:

```bash
kubectl apply -f <object-name>.yaml
```

## Apply port-forwarding to access the webapp

```bash
kubectl port-forward services/webapp-service 5000:80 -n frontend
```

Then you can access on heathcheck page on [localhost:5000/healthz](http://localhost:5000/healthz)

In order to access the backend API, the frontend sends a request to `backend-service.backend.svc.cluster.local:5000` you can find the serverRuntimeConfig in the `frontend/next.config.js` file.




