package com.springreport.controller.enhancements;

import com.springreport.annotation.Check;
import com.springreport.annotation.MethodLog;
import com.springreport.api.enhancements.ICommonDatasetService;
import com.springreport.base.Response;
import com.springreport.constants.Constants;
import com.springreport.dto.enhancements.CommonDatasetDto;
import com.springreport.dto.enhancements.CommonDatasetQuerySearch;
import com.springreport.dto.enhancements.CommonDatasetRequestDto;
import lombok.RequiredArgsConstructor;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 公共数据集类
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/springReport/api/commonDataset")
public class CommonDatasetController {

    private final ICommonDatasetService commonDatasetService;


    @RequestMapping(value = "/list", method = RequestMethod.POST)
    @MethodLog(module = "CommonDatasetQuerySearch", remark = "获取公共数据集", operateType = Constants.OPERATE_TYPE_SEARCH)
    @RequiresPermissions(value = {"reportTpl_reportDesign", "screenTpl_screenDesign", "slidTpl_design", "docTpl_design"}, logical = Logical.OR)
    public Response getTplDatasets(@RequestBody CommonDatasetQuerySearch search) throws Exception {
        List<CommonDatasetDto> result = this.commonDatasetService.getCommonDatasets(search);
        return Response.success(result);
    }


    @RequestMapping(value = "/save", method = RequestMethod.POST)
    @MethodLog(module = "SaveCommonDataset", remark = "保存数据集", operateType = Constants.OPERATE_TYPE_SAVE)
    @Check({"datasetName:required#数据集名称", "datasourceId:required#数据源id"})
    @RequiresPermissions(value = {"reportDesign_addDataSet", "reportDesign_editDataSet", "reportForms_addDataSet", "reportForms_editDataSet", "slidTpl_design", "docTpl_design"}, logical = Logical.OR)
    public Response saveCommonDataset(@RequestBody CommonDatasetRequestDto requestDto) throws Exception {
        this.commonDatasetService.saveCommonDateset(requestDto);
        return Response.success(Boolean.TRUE);
    }

    /**
     * 删除数据集
     * @return 删除结果
     * @throws Exception 异常
     */
    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    @MethodLog(module = "DeleteCommonDataset", remark = "删除数据集", operateType = Constants.OPERATE_TYPE_DELETE)
    public Response deleteCommonDataset(@RequestBody List<Long> ids) {
        this.commonDatasetService.removeBatchByIds(ids);
        return Response.success(Boolean.TRUE);
    }


    /**
     * 同步公共数据集
     */
    @RequestMapping(value = "/sync", method = RequestMethod.POST)
    @MethodLog(module = "SyncCommonDataset", remark = "同步公共数据集", operateType = Constants.OPERATE_TYPE_SAVE)
    @RequiresPermissions(value = {"reportDesign_addDataSet", "reportDesign_editDataSet", "reportForms_addDataSet", "reportForms_editDataSet", "slidTpl_design", "docTpl_design"}, logical = Logical.OR)
    public Response syncCommonDataset() throws Exception {
        return Response.success(Boolean.TRUE);
    }
}
