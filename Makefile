NAME := 332672892491.dkr.ecr.us-east-1.amazonaws.com/eduapps/admin-dashboard
TAG := $(shell git describe)
SPLIT := $(subst -, ,${TAG})
HASH := $(word 3,${SPLIT})
VERSION := $(firstword ${SPLIT})
VSPLIT := $(subst ., ,${VERSION})
MAJOR := $(firstword ${VSPLIT})
MINOR := ${MAJOR}.$(word 2, ${VSPLIT})

ifndef $($(strip HASH))
TAGS = -t ${NAME}:${MAJOR} -t ${NAME}:${MINOR}
endif

IMG := ${NAME}:${TAG}
LATEST := ${NAME}:latest

build:
	docker build -t ${IMG} -t ${LATEST} ${TAGS} .

push: build
	@docker push ${NAME}
