package com.huawei.docker;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@EnableAutoConfiguration
public class DockerController {
	// #region saveUserInfo

	@RequestMapping("docker/test")
	@ResponseBody
	public String test() {
		return "test result...";
	}

	// #endregion
}
