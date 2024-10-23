package com.springreport.dto.enhancements;

import lombok.Data;

@Data
public class CommonDatasetDto {

    private Long id;

    /** merchant_no - 商户号 */
    private String merchantNo;

    /**
     * @see com.springreport.enums.DatasetTypeEnum
     * 数据集类型 1sql 2api 3uds
     */
    private Integer datasetType;

    /** dataset_name - 数据集名称 */
    private String datasetName;

    /** datasource_id - 数据源id */
    private Long datasourceId;

    /**
     * 数据源名称
     */
    private String datasourceName;


    /** tpl_sql - sql语句 */
    private String tplSql;

    /** tpl_param - 参数 */
    private String tplParam;

    /** sql_type - sql类型 1标准sql 2存储过程 */
    private Integer sqlType;

    /** in_param - 存储过程入参 */
    private String inParam;

    /** out_param - 存储过程出参 */
    private String outParam;

    /** is_pagination - 是否分页 1是 2否 */
    private Integer isPagination;

    /** page_count - 每页显示条数 */
    private Integer pageCount;

    /** type - 类型 1报表 2大屏 */
    private Integer type;
}
