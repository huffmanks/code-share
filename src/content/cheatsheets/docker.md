---
title: docker
description: CLI commands to build, run, manage containers, images, networks, volumes, compose, security, and swarm.
updatedAt: 2026-09-20 19:31:36
groups:
  - title: Containers
    description: Commands for managing running and stopped containers.
    items:
      - label: List All Containers
        description: Shows running containers by default or all containers.
        code: docker ps -a
        comment: Use docker ps to list only running containers.
      - label: Start Stopped Container
        description: Starts a stopped container instance.
        code: docker start <container_id>
        example: docker start web_app
      - label: Stop Running Container
        description: Gracefully stops a running container instance.
        code: docker stop <container_id>
        example: docker stop web_app
        comment: Use docker kill to force stop.
      - label: Remove Stopped Container
        description: Deletes a stopped container from disk.
        code: docker rm <container_id>
        example: docker rm web_app
      - label: Run Interactive Container
        description: Starts a container and opens a shell session.
        code: docker run -it <image_name> <command>
        example: docker run -it ubuntu bash
        comment: Use --rm to automatically remove container after exit.
      - label: Execute Container Command
        description: Runs a command inside a running container.
        code: docker exec -it <container_id> <command>
        example: docker exec -it web_app bash
      - label: Copy Container Files
        description: Copies files between a container and host filesystem.
        code: docker cp <container_id>:<path> <destination>
        example: docker cp web_app:/app/logs.txt ./logs.txt
      - label: Inspect Container Metadata
        description: Displays low-level metadata about a container.
        code: docker inspect <container_id>
        example: docker inspect web_app
      - label: View Resource Statistics
        description: Displays real-time CPU, memory, and I/O statistics.
        code: docker stats
      - label: View Container Logs
        description: Shows logs from a running container.
        code: docker logs -f <container_id>
        example: docker logs -f web_app
  - title: Images and Building
    description: Commands for managing and building container images.
    items:
      - label: List Local Images
        description: Displays a list of all locally stored images.
        code: docker images
      - label: Pull Remote Image
        description: Downloads an image from a container registry.
        code: docker pull <image_name>
        example: docker pull nginx:latest
      - label: Build Image From Dockerfile
        description: Creates a Docker image from a local Dockerfile.
        code: docker build -t <image_name> .
        example: docker build -t my-app .
      - label: Build Without Cache
        description: Forces a fresh build without using cached layers.
        code: docker build --no-cache -t <image_name> .
        example: docker build --no-cache -t my-app .
      - label: Build Custom Dockerfile
        description: Specifies a custom Dockerfile for the build process.
        code: docker build -f <dockerfile> -t <image_name> .
        example: docker build -f Dockerfile.prod -t my-app .
      - label: Remove Local Image
        description: Deletes a Docker image from local storage.
        code: docker rmi <image_id>
        example: docker rmi my-app
      - label: Build And Push Image
        description: Builds and directly pushes the image to a registry.
        code: docker buildx build --push --tag <registry>/<image>:<tag> .
        example: docker buildx build --push --tag myregistry.com/my-app:latest .
  - title: Volumes and Persistent Storage
    description: Commands for managing volumes and persistent storage.
    items:
      - label: List Docker Volumes
        description: Shows all provisioned Docker volumes.
        code: docker volume ls
      - label: Create Persistent Volume
        description: Creates a new persistent data volume.
        code: docker volume create <volume_name>
        example: docker volume create pg_data
      - label: Remove Docker Volume
        description: Deletes an unused Docker data volume.
        code: docker volume rm <volume_name>
        example: docker volume rm pg_data
      - label: Run With Bind Mount
        description: Mounts a host directory into a container.
        code: docker run -v <host_path>:<container_path> <image_name>
        example: docker run -v /host/data:/app/data my-app
  - title: Networks and Custom Bridges
    description: Commands for managing networks and custom bridge configurations.
    items:
      - label: List Docker Networks
        description: Displays all active Docker networks.
        code: docker network ls
      - label: Create Custom Bridge Network
        description: Creates a custom user-defined bridge network.
        code: docker network create --driver bridge <network_name>
        example: docker network create --driver bridge app_net
      - label: Connect Container To Network
        description: Attaches a container to a specified network.
        code: docker network connect <network_name> <container_id>
        example: docker network connect app_net web_app
      - label: Disconnect Container Network
        description: Detaches a container from a network.
        code: docker network disconnect <network_name> <container_id>
        example: docker network disconnect app_net web_app
  - title: Docker Compose
    description: Commands for managing multi-container applications using Compose.
    items:
      - label: Start Compose Services
        description: Starts all services defined in configuration files.
        code: docker compose up -d
      - label: Stop Compose Services
        description: Stops and removes active container services.
        code: docker compose down
      - label: Restart Compose Services
        description: Restarts all running multi-container services.
        code: docker compose restart
      - label: View Compose Logs
        description: Displays real-time logs for all services.
        code: docker compose logs -f
      - label: List Compose Services
        description: Shows all active services and container statuses.
        code: docker compose ps
      - label: Execute Service Command
        description: Runs a command inside a running service container.
        code: docker compose exec <service_name> <command>
        example: docker compose exec app bash
      - label: Build Compose Services
        description: Builds images for services defined in configuration.
        code: docker compose build
  - title: Docker Security Best Practices
    description: Commands and configurations for enforcing container security hardening.
    items:
      - label: Run As Non Root
        description: Executes container processes using a non-root user ID.
        code: docker run --user <uid>:<gid> <image_name>
        example: docker run --user 1000:1000 my-app
      - label: Scan Image Vulnerabilities
        description: Analyzes container images for known security vulnerabilities.
        code: docker scout quickview <image_name>
        example: docker scout quickview nginx:latest
      - label: Check Rootless Status
        description: Verifies if the Docker daemon runs in rootless mode.
        code: docker info --format '{{.SecurityOptions}}'
        comment: Look for rootless in security options output.
  - title: Docker Secrets
    description: Commands for securely managing sensitive configuration data.
    items:
      - label: Create Docker Secret
        description: Creates a new encrypted secret object in Swarm.
        code: echo "<secret_value>" | docker secret create <secret_name> -
        example: echo "my_password" | docker secret create db_password -
      - label: List Docker Secrets
        description: Displays all stored secret objects.
        code: docker secret ls
      - label: Inspect Docker Secret
        description: Displays low-level metadata of a secret object.
        code: docker secret inspect <secret_name>
        example: docker secret inspect db_password
      - label: Remove Docker Secret
        description: Deletes an existing secret object.
        code: docker secret rm <secret_name>
        example: docker secret rm db_password
  - title: Docker Swarm Basics
    description: Commands for orchestrating multi-node container clusters.
    items:
      - label: Initialize Docker Swarm
        description: Initializes the current node as a Swarm manager.
        code: docker swarm init
      - label: Join Swarm Cluster
        description: Connects a worker or manager node to a cluster.
        code: docker swarm join --token <token> <manager_ip>:<port>
        example: docker swarm join --token SWMTKN-1-xx 192.168.1.10:2377
      - label: List Swarm Nodes
        description: Displays all nodes participating in the Swarm cluster.
        code: docker node ls
      - label: Create Swarm Service
        description: Deploys a replicated service across the Swarm.
        code: docker service create --name <service_name> --replicas <num> <image_name>
        example: docker service create --name web --replicas 3 nginx
      - label: List Swarm Services
        description: Displays all active services running in the Swarm.
        code: docker service ls
  - title: System Cleanup
    description: Commands for cleaning up unused system resources.
    items:
      - label: Remove Stopped Containers
        description: Deletes all stopped containers to reclaim space.
        code: docker container prune
      - label: Remove Unused Images
        description: Deletes unreferenced dangling and unused images.
        code: docker image prune
      - label: Remove Unused Volumes
        description: Deletes orphaned volumes not used by containers.
        code: docker volume prune
      - label: Remove Unused Networks
        description: Cleans up unused custom networks.
        code: docker network prune
      - label: View System Disk Usage
        description: Displays disk space utilization by Docker objects.
        code: docker system df
---
