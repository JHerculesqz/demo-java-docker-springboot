## 目的##
演示SpringBoot+Gradle+Docker

##实现步骤(腾讯云)##
**STEP1.先把云端Linux配置好**
	
	1.安装FTP，注意FTPServer的文件夹设置成可读写
	2.安装SecureCRT
	3.安装jdk
		-http://www.linuxidc.com/Linux/2016-05/131348.htm
		-即使有docker，我就要安装jdk，怎么滴怎么滴怎么滴?
	
##Docker##
###Docker基本用法 ###
**1.Docker的基本操作**
	
	docker run -i -t ubuntu /bin/bash
	docker run --name Monkey -i -t ubuntu /bin/bash
	docker run --name Monkey -d ubuntu /bin/sh -c "while true; do echo hello world;sleep 1;done"
	
	docker start Monkey
	docker restart Monkey
	docker attach Monkey
	docker stop Monkey
	docker rm -f Monkey
	
	docker info
	docker ps
	docker ps -a
	docker ps -l
	docker logs -f Monkey
	docker inspect Monkey
	docker top Monkey
	docker stats Monkey
	
	docker images
	docker images <image_id>
	docker rmi <image_id>
	docker rmi <image_name>
	docker history <image_id>
	
**2.crud custom repository to dockerhub**
	
	STEP1.init for server
		docker search <image_name>:<image_version>
		docker login
	STEP2.1.create local image by commit
		#runtime_id:docker ps -a
		docker commit -m"first repo" -a"jherculesqz" <runtime_id> jherculesqz/test:ubuntu
	STEP2.2.create local image by Dockerfile
		docker build -t="jherculesqz/test:ubuntu" .
	STEP3.push to server
		docker push jherculesqz/test
	STEP4.use image
		docker pull jherculesqz/test
	
**3.custom hub**
	
	STEP1.init for server
		docker run -d -p 5000:5000 --restart=always --name registry registry
		docker stop registry && docker rm -v registry
	STEP2.1.create local image by commit
		#runtime_id:docker ps -a
		docker commit -m"first repo" -a"jherculesqz" <runtime_id> jherculesqz/test:ubuntu
		docker tag <image_id> localhost:5000/jherculesqz/test
	STEP2.2.create local image by Dockerfile
		docker build -t="jherculesqz/test:ubuntu" .
	STEP3.push to server
		docker push localhost:5000/jherculesqz/test
		curl http://localhost:5000/v2/_catalog
	STEP4.stop and clear repo
	STEP5.use image
		docker pull jherculesqz/test
	
## 实现步骤(本地) ##
**STEP1.编写build.gradle**
	
	dependencies {
		//for docker
		classpath('se.transmode.gradle:gradle-docker:1.2')
	}

	//for docker
	group = 'crystal'
	apply plugin: 'docker'
	
	//for docker
	task buildDocker(type: Docker, dependsOn: build) {
  		push = true
  		applicationName = jar.baseName
  		dockerfile = file('src/main/docker/Dockerfile')
  		doFirst {
    		copy {
      			from jar
      			into stageDir
    		}
  		}
	}
	
**STEP2.编写src/main/docker/Dockerfile**
	
	FROM frolvlad/alpine-oraclejdk8:slim
	VOLUME /tmp
	ADD demo-java-docker-springboot.jar app.jar
	RUN sh -c 'touch /app.jar'
	ENV JAVA_OPTS=""
	ENTRYPOINT [ "sh", "-c", "java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar /app.jar" ]
		
**STEP3.编写2.build_docker.bat**
	
	cd %~dp0
	call gradlew clean
	cd %~dp0
	
	cd %~dp0
	call gradlew build buildDocker
	cd %~dp0
	
**STEP4.艰难的上传image到dockerHub**
	
	https://spring.io/guides/gs/spring-boot-docker/
	https://hub.docker.com/u/jherculesqz/



**STEP1.Install Docker on Ubuntu**
	
	https://docs.docker.com/engine/installation/linux/ubuntulinux/
	潜规则：注意"$ echo "<REPO>" | sudo tee /etc/apt/sources.list.d/docker.list"这一步

**STEP2.启动Docker Deamon**
	
	sudo service docker start
	sudo docker images
	sudo docker pull jherculesqz/demo-java-docker-springboot
	
## Reference ##
		
	https://spring.io/guides/gs/spring-boot-docker/	










