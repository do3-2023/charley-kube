# charley-kube

## 1. Create deployment for backend

First go to `backend\infra` :

```bash
cd backend/infra
```

Create the namespace `backend`:

```bash
kubectl create namespace backend
```

Then generate the deployment `deploy_backend.yaml`:

```bash
kubectl create deploy backend --image=ghcr.io/do3-2023/charley-kube-backend:latest -n backend --dry-run=client -o yaml > deploy_backend.yaml
```

Then you can apply the deployment:

```bash
kubectl apply -f deploy_backend.yaml
```

## Create deployment for frontend

First go to `frontend\infra` :

```bash
cd frontend/infra
```

Create the namespace `frontend`:

```bash
kubectl create namespace frontend
```

Then generate the deployment `deploy_frontend.yaml`:

```bash
kubectl create deploy frontend --image=ghcr.io/do3-2023/charley-kube-frontend:latest -n frontend --dry-run=client -o yaml > deploy_frontend.yaml
```

To know the port of the frontend service:

```bash
kubectl get svc -n frontend
```
To get the IP of the frontend service:

```bash
kubectl get nodes -o wide
```

## 3. Create service for frontend SSR (NodePort)

Assuming you are still in `frontend\infra` to generate the service `svc_frontend.yaml`:

```bash
kubectl expose deployment webapp --port 80 --target-port 3000 --dry-run=client -o yaml > svc_frontend.yaml
```

## 5. Create postgres deployment

First go to `postgres\infra` :

```bash
cd db/infra
```

Then generate the deployment `deploy_postgres.yaml`:

```bash
kubectl create deploy postgres --image=postgres:latest -n db --dry-run=client -o yaml > postgres_deployment.yaml
```
