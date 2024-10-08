 /** 
 * 模块：报表系统-SysApi
 * 本文件由代码生成器自动完成,不允许进行修改
 */
package com.springreport.entity.sysapi;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.springreport.base.PageEntity;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

 /**  
* @Description: sys_api - 
* @author 
* @date 2022-06-30 07:04:13
* @version V1.0  
 */
@Data
@TableName("sys_api")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SysApi extends PageEntity {

    /** id - 主键id */
    
    @TableId(value = "id",type = IdType.ASSIGN_ID)
    private Long id;

    /** menu_id - 菜单表主键 */
    @TableField("menu_id")
    private Long menuId;

    /** api_code - 权限标识 */
    @TableField("api_code")
    private String apiCode;

    /** api_name - 权限名称 */
    @TableField("api_name")
    private String apiName;

    /** api_function - 权限描述 */
    @TableField("api_function")
    private String apiFunction;

    /** sort - 排序 */
    @TableField("sort")
    private Integer sort;

    /** creator - 创建人 */
    @TableField(value = "creator",fill = FieldFill.INSERT)
    private Long creator;

    /** create_time - 创建时间 */
    @TableField(value = "create_time",fill = FieldFill.INSERT)
    private Date createTime;

    /** updater - 更新人 */
   @TableField(value = "updater",fill = FieldFill.INSERT_UPDATE)
    private Long updater;

    /** update_time - 更新时间 */
    @TableField(value = "update_time",fill = FieldFill.INSERT_UPDATE)
    private Date updateTime;

    /** del_flag - 删除标记 1未删除 2已删除 */
    @TableField("del_flag")
    private Integer delFlag;
}