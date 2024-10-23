package com.springreport.impl.enhancements;

import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.springreport.api.enhancements.ICommonDatasetService;
import com.springreport.api.reportdatasource.IReportDatasourceService;
import com.springreport.dto.enhancements.CommonDatasetDto;
import com.springreport.dto.enhancements.CommonDatasetQuerySearch;
import com.springreport.dto.enhancements.CommonDatasetRequestDto;
import com.springreport.entity.enhancements.CommonDataset;
import com.springreport.entity.reportdatasource.ReportDatasource;
import com.springreport.mapper.enhancements.CommonDatasetMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommonDatasetServiceImpl extends ServiceImpl<CommonDatasetMapper, CommonDataset> implements ICommonDatasetService {


    private final IReportDatasourceService reportDatasourceService;

    /**
     * 获取公共数据集
     * @param search 查询参数
     * @return 公共数据集列表
     */
    @Override
    public List<CommonDatasetDto> getCommonDatasets(CommonDatasetQuerySearch search) {
        LambdaQueryWrapper<CommonDataset> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(CommonDataset::getMerchantNo, search.getMerchantNo());
        if (StrUtil.isNotEmpty(search.getDatasetName())) {
            queryWrapper.like(CommonDataset::getDatasetName, search.getDatasetName());
        }
        if (StrUtil.isNotEmpty(search.getDatasetType())) {
            queryWrapper.eq(CommonDataset::getDatasetType, search.getDatasetType());
        }
        List<CommonDataset> list = this.baseMapper.selectList(queryWrapper);
        if (list.isEmpty()) {
            return new ArrayList<>();
        }
        List<ReportDatasource> reportDatasourceList = reportDatasourceService.list();
        Map<Long, ReportDatasource> map = reportDatasourceList.stream().collect(Collectors.toMap(ReportDatasource::getId, Function.identity()));
        List<CommonDatasetDto> commonDatasetDtos = new ArrayList<>();
        for (CommonDataset commonDataset : list) {
            CommonDatasetDto commonDatasetDto = new CommonDatasetDto();
            BeanUtils.copyProperties(commonDataset, commonDatasetDto);
            ReportDatasource reportDatasource = map.get(commonDataset.getDatasourceId());
            if (reportDatasource != null) {
                commonDatasetDto.setDatasourceName(reportDatasource.getName());
            }
            commonDatasetDtos.add(commonDatasetDto);
        }
        return commonDatasetDtos;
    }

    /**
     * 保存公共数据集
     * @param requestDto 请求参数
     */
    @Override
    public void saveCommonDateset(CommonDatasetRequestDto requestDto) {
        CommonDataset commonDataset = new CommonDataset();
        BeanUtils.copyProperties(requestDto, commonDataset);
        this.saveOrUpdate(commonDataset);
    }
}
