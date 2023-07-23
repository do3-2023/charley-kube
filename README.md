# Kubernetes project for Charley

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

## Create all namespaces required

For each namespace you want to create, you can use the following command (frontend, backend, db):

```bash
kubectl create namespace <namespace>
```



