package com.springreport.mapper.sysuserdept;
import com.springreport.entity.sysuserdept.SysUserDept;
import java.util.List;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

 /**  
* @Description: SysUserDeptMapper类
* @author 
* @date 2023-12-22 05:19:37
* @version V1.0  
 */
public interface SysUserDeptMapper extends BaseMapper<SysUserDept>{

    /**
     * 通过条件，查询数据集合，返回分页数据，字符串参数模糊查询
     *
     * @param model 包含查询条件的对象实体
     * @return 实体集合
     */
    List<SysUserDept> searchDataLike(final SysUserDept model);
}
