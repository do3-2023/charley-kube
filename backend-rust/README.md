# Deploy SPIN app

## Prerequisites

- k3d
- kubectl

## Run SPIN app

1. Create cluster

```bash
k3d cluster create wasm-cluster \
  --image ghcr.io/spinkube/containerd-shim-spin/k3d:v0.14.1 \
  --port "8081:80@loadbalancer" \
  --agents 2
```

2. Install CERT-Manager

```bash
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.14.3/cert-manager.yaml
```

3. Install RUNTIME CLASS

```bash
kubectl apply -f https://github.com/spinkube/spin-operator/releases/download/v0.2.0/spin-operator.runtime-class.yaml
```
4. Apply SPIN CRD

```bash
kubectl apply -f https://github.com/spinkube/spin-operator/releases/download/v0.2.0/spin-operator.crds.yaml
```

5. Deploy SPIN Operator

```bash
helm install spin-operator \
  --namespace spin-operator \
  --create-namespace \
  --version 0.2.0 \
  --wait \
  oci://ghcr.io/spinkube/charts/spin-operator
```

6. Create shim executor

```bash 
kubectl apply -f https://github.com/spinkube/spin-operator/releases/download/v0.2.0/spin-operator.shim-executor.yaml
```

7. Registry credentials

**_NOTE:_** Replace and export `$GH_USER` and `$CR_PAT` with your GitHub username and GitHub Personal Access Token.

```bash
kubectl create secret docker-registry ghcr \
    --docker-server ghcr.io \
    --docker-username $GH_USER \
    --docker-password $CR_PAT
```

8. Deploy SPIN App

```bash 
kubectl apply -f infra/wasm/spinapp.yaml
```
