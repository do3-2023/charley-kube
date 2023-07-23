# Kubernetes project 

## How it works

This project is a Kubernetes project that will be used to deploy a frontend, a backend and a database. The frontend will be a SSR application using [Next.js](https://nextjs.org/), the backend will be a REST API using [Express](https://expressjs.com/) and the database will be a [Postgres](https://www.postgresql.org/) database.

A CI github actions is configured to build the docker images and push them to the github registry. The images are then pulled from the registry and deployed on the Kubernetes cluster.

## Install kind

```bash
[ $(uname -m) = x86_64 ] && curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.20.0/kind-$(uname)-amd64
chmod +x ./kind
sudo mv ./kind /usr/local/bin/kind
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


