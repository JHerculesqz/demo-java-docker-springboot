## 目的##
演示SpringBoot+Gradle+Docker

## 步骤##
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
	
**STEP4.未完待续**
	
	docker的windows版本未搭建好，未完待续
	
## Reference ##
		
	https://spring.io/guides/gs/spring-boot-docker/	