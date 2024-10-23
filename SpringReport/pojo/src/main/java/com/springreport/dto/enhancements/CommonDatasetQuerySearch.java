package com.springreport.dto.enhancements;

import lombok.Data;

/**
 * 公共数据源搜索
 */
@Data
public class CommonDatasetQuerySearch {

    /**
     * 商户号
     */
    private String merchantNo;

    /**
     * 数据集名称
     */
    private String datasetName;

    /**
     * 数据集类型
     */
    private String datasetType;

}
