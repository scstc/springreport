package com.springreport.api.enhancements;

import com.baomidou.mybatisplus.extension.service.IService;
import com.springreport.dto.enhancements.CommonDatasetDto;
import com.springreport.dto.enhancements.CommonDatasetQuerySearch;
import com.springreport.dto.enhancements.CommonDatasetRequestDto;
import com.springreport.entity.enhancements.CommonDataset;

import java.util.List;

public interface ICommonDatasetService extends IService<CommonDataset> {

    /**
     * 获取公共数据集列表
     * @param search 查询参数
     * @return 数据集列表
     */
    List<CommonDatasetDto> getCommonDatasets(CommonDatasetQuerySearch search);

    /**
     * 保存公共数据集
     * @param requestDto 请求参数
     */
    void saveCommonDateset(CommonDatasetRequestDto requestDto);
}
