/*   
 * Copyright (c) 2016-2020 canaanQd. All Rights Reserved.   
 *   
 * This software is the confidential and proprietary information of   
 * canaanQd. You shall not disclose such Confidential Information   
 * and shall use it only in accordance with the terms of the agreements   
 * you entered into with canaanQd.   
 *   
 */ 

package com.springreport.enums;

import com.springreport.base.BaseCharEnum;

/** 
* @ClassName: CheckRuleEnum 
* @Description: 接口访问规则枚举类
* @author joseph
* @date 2019年10月24日13:54:30
*  
*/
public enum CheckRuleEnum implements BaseCharEnum{

	PUB {
		public String getCode() {
			return "1";
		}

		public String getName() {
			return "公开访问";
		}
	},
	JWT {
		public String getCode() {
			return "2";
		}

		public String getName() {
			return "登陆后访问";
		}
	},
	JWTAUTH {
		public String getCode() {
			return "3";
		}

		public String getName() {
			return "登陆后并授权访问";
		}
	}
}
