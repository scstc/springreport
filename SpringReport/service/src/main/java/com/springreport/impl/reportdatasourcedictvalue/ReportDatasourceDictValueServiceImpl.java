package com.springreport.impl.reportdatasourcedictvalue;

import com.springreport.entity.reportdatasourcedictvalue.ReportDatasourceDictValue;
import com.springreport.mapper.reportdatasourcedictvalue.ReportDatasourceDictValueMapper;
import com.springreport.api.reportdatasourcedictvalue.IReportDatasourceDictValueService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import com.springreport.util.MessageUtil;
import com.github.pagehelper.PageHelper;
import com.springreport.base.BaseEntity;
import com.springreport.base.PageEntity;
import java.util.ArrayList;
import java.util.List;
import org.springframework.transaction.annotation.Transactional;
import com.springreport.enums.DelFlagEnum;

 /**  
* @Description: ReportDatasourceDictValue服务实现
* @author 
* @date 2021-08-23 07:52:08
* @version V1.0  
 */
@Service
public class ReportDatasourceDictValueServiceImpl extends ServiceImpl<ReportDatasourceDictValueMapper, ReportDatasourceDictValue> implements IReportDatasourceDictValueService {
  
	/** 
	* @Title: tablePagingQuery 
	* @Description: 表格分页查询
	* @param @param model
	* @return BaseEntity 
	* @author 
	* @throws 
	*/ 
	@Override
	public PageEntity tablePagingQuery(ReportDatasourceDictValue model) {
		PageEntity result = new PageEntity();
		model.setDelFlag(DelFlagEnum.UNDEL.getCode());
		com.github.pagehelper.Page<?> page = PageHelper.startPage(model.getCurrentPage(), model.getPageSize()); //分页条件
		List<ReportDatasourceDictValue> list = this.baseMapper.searchDataLike(model);
		result.setData(list);
		result.setTotal(page.getTotal());
		result.setCurrentPage(model.getCurrentPage());
		result.setPageSize(model.getPageSize());
		return result;
	}


	/**
	*<p>Title: getDetail</p>
	*<p>Description: 获取详情</p>
	* @author 
	* @param id
	* @return
	*/
	@Override
	public BaseEntity getDetail(Long id) {
		return this.getById(id);
	}

	/**
	*<p>Title: insert</p>
	*<p>Description: 新增数据</p>
	* @author 
	* @param model
	* @return
	*/
	@Transactional
	@Override
	public BaseEntity insert(ReportDatasourceDictValue model) {
		BaseEntity result = new BaseEntity();
		this.save(model);
		result.setStatusMsg(MessageUtil.getValue("info.insert"));
		return result;
	}

	/**
	*<p>Title: update</p>
	*<p>Description: 更新数据</p>
	* @author 
	* @param model
	* @return
	*/
	@Transactional
	@Override
	public BaseEntity update(ReportDatasourceDictValue model) {
		BaseEntity result = new BaseEntity();
		this.updateById(model);
		result.setStatusMsg(MessageUtil.getValue("info.update"));
		return result;
	}

	/**
	*<p>Title: delete</p>
	*<p>Description: 单条删除数据</p>
	* @author 
	* @param model
	* @return
	*/
	@Transactional
	@Override
	public BaseEntity delete(Long id) {
		ReportDatasourceDictValue reportDatasourceDictValue = new ReportDatasourceDictValue();
		reportDatasourceDictValue.setId(id);
		reportDatasourceDictValue.setDelFlag(DelFlagEnum.DEL.getCode());
		this.updateById(reportDatasourceDictValue);
		BaseEntity result = new BaseEntity();
		result.setStatusMsg(MessageUtil.getValue("info.delete"));
		return result;
	}

	/**
	*<p>Title: deleteBatch</p>
	*<p>Description: 批量删除数据</p>
	* @author 
	* @param list
	* @return
	*/
	@Transactional
	@Override
	public BaseEntity deleteBatch(List<Long> ids) {
		List<ReportDatasourceDictValue> list = new ArrayList<ReportDatasourceDictValue>();
		for (int i = 0; i < ids.size(); i++) {
			ReportDatasourceDictValue reportDatasourceDictValue = new ReportDatasourceDictValue();
			reportDatasourceDictValue.setId(ids.get(i));
			reportDatasourceDictValue.setDelFlag(DelFlagEnum.DEL.getCode());
			list.add(reportDatasourceDictValue);
		}
		BaseEntity result = new BaseEntity();
		if (list != null && list.size() > 0) {
			this.updateBatchById(list);
		}
		result.setStatusMsg(MessageUtil.getValue("info.delete"));
		return result;
	}
}