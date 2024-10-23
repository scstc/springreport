package com.springreport.enums;

import com.springreport.base.BaseIntEnum;

/**
 * @ClassName: DatasetTypeEnum
 * @Description: 数据集类型
 * @author caiyang
 * @date 2021-10-25 08:28:32 
 */
public enum DatasetTypeEnum implements BaseIntEnum {

    SQL {
        @Override
        public Integer getCode() {
            return 1;
        }

        @Override
        public String getName() {
            return "sql语句";
        }
    },
    API {
        @Override
        public Integer getCode() {
            return 2;
        }

        @Override
        public String getName() {
            return "接口";
        }
    },
    UDS {
        @Override
        public Integer getCode() {
            return 3;
        }

        @Override
        public String getName() {
            return "uds";
        }
    }
}
