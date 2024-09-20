/*
 * @Description: luckysheetreport预览页面js
 * @Version: 1.0
 * @Autor: caiyang
 * @Date: 2022-02-08 07:56:31
 * @LastEditors: caiyang caiyang90@163.com
 * @LastEditTime: 2022-08-23 16:40:43
 */
import Axios from 'axios'
export default {
    data() {
        return{
            showReportSql:false,
            reportSqls:{},
            reportDialogVisiable:false,
            users:[],
            headerUsers:[],
            loadingText:"",
            loading:false,
            searchData:{
                params:[],
            },//参数
            isParamMerge:"2",
            searchHandle:[
            ],
            printDialogVisiable:false,//显示打印对话框
            printType:"1",//打印方式 1html打印 2canvas打印
            printForm:{
                start:"",
                end:"",
            },
            tplType:1,
            tplName:"",
            reportForm:[],
            showReportForm:false,
            isShowPagination:false,
            activitiName:"",
            showSearch:true,//是否隐藏查询条件
            imgMap:{},
            pageParam:{
                currentPage:"1",//当前页数
                pageCount:"",//每页显示条数
            },
            isPagination:false,
            sheetNowFunction:{},
            sheetFunctionCellFormat:{},
            sheetDrillCells:{},//下钻单元格
            isDrill:2,//当前展示报表是否是下钻报表 1是 2否
            isDrillBack:2,//是否是下钻报表返回 1是 2否
            drillParams:{},//下钻参数
            parentParams:{},//上级报表参数
            currentTplId:null,//当前报表id
            drillRelations:{},
            pageDialogVisiable:false,//指定分页对话框
            pageForm:{
                startPage:null,
                endPage:null,
            },
            pdfPageDialogVisiable:false,
            pdfPageDialogType:1,//1 pdf 2打印
            pdfPageForm:{
                startPage:null,
                endPage:null,
                type:1
            },
            isShare:false,//是否是分享链接
            shareCode:"",
            shareUser:"",
            sheetOptions:{
                container: 'luckysheet', //luckysheet为容器id
                title:"", //表 头名
                lang: 'zh', //中文
                plugins: ['chart'],
                fontList:[
                    {
                    "fontName":"条形码（barCode128）",
                    "url":""
                    },
                    {
                      "fontName":"二维码（qrCode）",
                      "url":""
                    },
                  ],
                forceCalculation:true,
                functionButton: '',
                index:'0', //工作表索引
                status:'1',//激活状态
                order:'0', //工作表的顺序
                hide:'0',  //是否隐藏
                showtoolbar: false,//是否显示工具栏
                showinfobar: false,//是否显示顶部信息栏
                showsheetbar: true,//是否显示底部sheet按钮
                allowEdit: true,
                // allowCopy:false,
                rowHeaderWidth:46,
                columnHeaderHeight:20,
                sheetFormulaBar:true,
                showtoolbarConfig:{
                    
                },
                cellRightClickConfig:{
                    copyAs: false, // 复制为
                    deleteCell: false, // 删除单元格
                    hideRow: false, // 隐藏选中行和显示选中行
                    hideColumn: false, // 隐藏选中列和显示选中列
                    matrix: false, // 矩阵操作选区
                    sort: false, // 排序选区
                    filter: false, // 筛选选区
                    chart: false, // 图表生成
                    image: false, // 插入图片
                    data: false, // 数据验证
                    cellFormat: false, // 设置单元格格式
                    link: false, // 插入链接
                },
                pager:{
                },
                hook:{
                    // cellRenderAfter: this.cellRenderAfter,
                    onTogglePager:this.onTogglePager,
                    sheetActivate:this.sheetActivate,
                    cellMousedown:this.cellMousedown,

                    cellEditBefore:this.cellEditBefore,
                    cellUpdated:this.cellUpdated,
                    // cellRenderAfter: this.cellRenderAfter,
                    rangeClear:this.rangeClear,
                    rangeSelect:this.rangeSelect,
                    userChanged:this.userChanged,
                    loadDataAfter:this.loadDataAfter,
                    uploadAttachment:this.uploadAttachment,
                    viewAttachment:this.viewAttachment
                }
            },
            //modal配置 start
            modalConfig: {
                title: "另存为协同编辑文档", //弹窗标题,值为:新增，查看，编辑
                show: false, //弹框显示
                formEditDisabled: false,//编辑弹窗是否可编辑
                width: '700px',//弹出框宽度
                modalRef: "modalRef",//modal标识
                type: "1"//类型 1新增 2编辑 3保存
            },
            //modal配置 end
            //modal表单 start
            modalForm: [
                { type: 'Input', label: '文档名称', prop: 'tplName', rules: { required: true, maxLength: 50 } },
            ],
            //modal表单 end
            //modal 数据 start
            modalData: {//modal页面数据
                tplName: "",//文档名称
            },
            //modal 数据 end
            //modal 按钮 start
            modalHandles: [
                { label: '取消', type: 'default', handle: () => this.closeModal() },
                { label: '提交', type: 'primary', handle: () => this.transOnline() }
            ],
            //modal 按钮 end
            refreshPage:2,
            reportVersion:null,//上报数据版本号
            extraCustomCellConfigs:{},//原始单元格配置信息
            extendCellOrigins:{},//扩展单元格与原始单元格对应关系
            addExtendCellOrigins:{},//新增数据 扩展单元格与原始单元格对应关系
            columnStartCoords:{},//列对应的起始单元格
            cellDatasourceConfigs:{},//原始单元格绑定的数据源信息
            cellAllowEditConfigs:{},//原始单元格是否可编辑配置信息
            sheetTableKeys:{},//表格主键
            rowDatas:{},//与数据集绑定的数据
            datasKey:{},//数据主键信息
            dictDatas:{},//数据字典值
            basicData:{},//原始单元格数据
            basicRowDatas:{},//与数据集绑定的原始数据
            submitBasicData:{},//页面不刷时，记录提交时的数据，将该数据作为下一次提交的原始数据
            editDialog:false,
            editForm:{
                cellContent:""
            },
            cellConfig:{
            },
            dateFormat:"",//日期格式
            rules:{},
            dictTypeDatas:[],
            editR:null,//编辑行坐标
            editC:null,//编辑列坐标
            editBeforeValue:null,//编辑前的值
            reportHisDialog:false,//上报历史
            ctx:null,
            clickCellPosition:null,
            showRowHeader:true,
            showColHeader:true,
            //表格数据start
            tableData:[],
            //表格数据end
            //表格工具栏按钮 start
            tableHandles:[
            ],
            //表格工具栏按钮 end
            selectList:[],//表格选中的数据
            //表格分页信息start
            tablePage:{
            currentPage: 1,
            pageSize:10,
            pageTotal: 0,
            pageSizeRange:[5, 10, 20, 50]
            },
            //表格分页信息end
            //表格列表头start
            tableCols:[
                {label:'报表模板',prop:'tplName',align:'center',overflow:true,width:100},
                {label:'sheet名称',prop:'sheetName',align:'center',overflow:true,width:100},
                {label:'数据源',prop:'datasourceName',align:'center',overflow:true,width:100},
                {label:'表名',prop:'tableName',align:'center',overflow:true,width:100},
                {label:'原始数据',prop:'basicData',align:'center',overflow:true,width:200},
                {label:'上报数据',prop:'reportData',align:'center',overflow:true,width:200},
                {label:'变化数据(修改前)',prop:'changeDataBefore',align:'center',overflow:true,width:150},
                {label:'变化数据(修改后)',prop:'changeDataAfter',align:'center',overflow:true,width:150},
                {label:'ip',prop:'operateIp',align:'center',overflow:true,width:100},
                {label:'操作人',prop:'creatorName',align:'center',overflow:true,width:100},
                {label:'操作时间',prop:'createTime',align:'center',overflow:true,width:180},
            ],
            reCalculate:{},//需要重新计算的数据，因为前端计算会有精度丢失，所以记录下来去后台计算
            formsDatasourceAttrs:{},//填报报表对应的必填属性，用来校验新增行数据是否所有的必填属性都填了
            addDataCoords:{},//新增数据对应的坐标和扩展属性
            apiHeaders:[],
        }
    },
    mounted(){
        var shareCode = this.$route.query.shareCode;
        var shareUser = this.$route.query.shareUser;
        if(shareCode && shareUser)
        {
            this.isShare = true;
            this.shareCode = shareCode;
            this.shareUser = shareUser;
        }else{
            this.isShare = false;
            this.shareCode = "";
            this.shareUser = "";
        }
        if(this.isDrill == 2)
        {
            this.currentTplId = this.$route.query.tplId;
        }
        this.getReportParam();
        var that = this;
        $(document).off("click").click(function (event)
        {
            if(event.target.className.indexOf("icon-saveas24") >= 0)
            {//另存为协同编辑文档
                that.modalConfig.show = true;
            }else if(event.target.className.indexOf("icon-baocun2") >= 0)
            {//保存
                that.submitDatas();
            }else if(event.target.className.indexOf("icon-lishijilu") >= 0)
            {//上报历史记录
                that.reportHisDialog = true;
                that.searchtablelist();
            }else if(event.target.className.indexOf("icon-8tupian-1") >= 0)
            {//上传图片
                if(that.ctx)
                {
                    var r = that.clickCellPosition.r;
                    var c = that.clickCellPosition.c;
                    var key = r+"_"+c;
                    var sheetIndex = luckysheet.getSheet().index;
                    //判断该单元格是否可编辑
                    if(that.cellAllowEditConfigs[sheetIndex])
                    {
                        var orginCell = that.extendCellOrigins[sheetIndex][key];
                        if(!orginCell)
                        {
                            orginCell = that.getNewCellExtendOrigins(sheetIndex,r,c);
                        }
                        if(orginCell)
                        {
                            var allowEdit = that.cellAllowEditConfigs[sheetIndex][orginCell.r+"_"+orginCell.c];
                            if(!allowEdit)
                            {
                                that.commonUtil.showMessage({message:"该单元格不允许进行编辑。",type: "error"})
                                return;
                            }else{
                                $('#uploadPic').click()
                            }
                        }
                    }else{
                        $('#uploadPic').click()
                    }
                }else{
                    that.commonUtil.showMessage({message:"请先点击选择要上传图片的单元格",type: "error"})
                }
            }
        });
     },
    methods:{
        initLuckySheet(){
            var options = this.sheetOptions;
            luckysheet.create(options);
        },
        sheetActivate(){
            var that = this;
            setTimeout(function(){
                that.updateNowFunction();
                that.updateCellFormat();
            },100);
        },
        updateNowFunction(){
            var sheet = luckysheet.getSheet();
            var order = sheet.order;
            var nowFunction = this.sheetNowFunction[order];
            if(nowFunction)
            {
                for(var key in nowFunction) {
                    var r = key.split("_")[0];
                    var c = key.split("_")[1];
                    var ct = nowFunction[key].ct;
                    var v = nowFunction[key].v
                    luckysheet.setCellFormat(r, c, 'ct', ct);
                    luckysheet.setCellValue(r,c, v,{isRefresh:true})
                }
            }
        },
        updateCellFormat(){
            var sheet = luckysheet.getSheet();
            var order = sheet.order;
            var functionCellFormat = this.sheetFunctionCellFormat[order];
            if(functionCellFormat)
            {
                for(var key in functionCellFormat){
                    var r = key.split("_")[0];
                    var c = key.split("_")[1];
                    var ct = functionCellFormat[key];
                    luckysheet.setCellFormat(r, c, 'ct', ct);
                }
                luckysheet.refresh()
            }
        },
        //获取报表参数
        getReportParam(){
            let tplId = this.currentTplId;
            let urlParamsLength = 0;
            if(this.$route.query)
            {
                let urlParams = { ...this.$route.query}
                delete urlParams['tplId']
                delete urlParams['token']
                urlParamsLength = Object.keys(urlParams).length
            }
            let obj = {
                url:this.apis.previewReport.getPreviewReportParamApi,
                params:{tplId:tplId,initSelectData:this.isDrill == 1 || this.isDrillBack == 1 || urlParamsLength > 0},
            }
            let headers = {};
            if(this.isShare == 1)
            {
                headers.shareCode = this.shareCode;
                headers.shareUser = this.shareUser;
                obj.url = this.apis.previewReport.getSharePreviewReportParamApi
            }
            this.searchHandle=[
                {label:'查询',icon:'el-icon-search',type:'primary',handle:()=>this.getReportData(),size:'mini'},
                {label:'重置',icon:'el-icon-refresh-left',type:'warning',handle:()=>this.resetSearch(),size:'mini'},
                // {label:'canvas打印',icon:'el-icon-printer',type:'primary',handle:()=>this.print('2'),size:'mini'},
                {label:'导出excel(全部数据)',icon:'iconfont icon-daochuExcel',type:'success',handle:()=>this.exportExcel(),size:'mini'},
                {label:'PDF预览(全部数据)',icon:'iconfont icon-daochuPDF',type:'warning',handle:()=>this.pdfExport(1),size:'mini'},
                {label:'打印(全部数据)',icon:'el-icon-printer',type:'danger',handle:()=>this.pdfPrint(1),size:'mini'},
            ];
            var that = this;
            this.commonUtil.doPost(obj,headers) .then(response=>{
                if (response.code == "200")
                {
                    let result = response.responseData.params;
                    this.searchData.params = [];
                    that.apiHeaders = response.responseData.apiHeaders;
                    let isPagination = response.responseData.isPagination;//是否分页
                    for(let i = 0;i<result.length;i++)
                    {
                        var dataSet = {};
                        dataSet.datasetId = result[i].datasetId;
                        dataSet.datasetName = result[i].datasetName;
                        dataSet.datasourceId = result[i].datasourceId;
                        dataSet.params = [];
                        let tempParams = {};
                        for(let m = 0;m<result[i].params.length;m++){
                            var param = {};
                            if(result[i].params[m].paramType == "mutiselect" || result[i].params[m].paramType == "multiTreeSelect")
                            {
                                var data = new Array();
                                if(this.isDrillBack == 1)
                                {
                                    if(this.parentParams && this.parentParams[dataSet.datasetId] && this.parentParams[dataSet.datasetId][result[i].params[m].paramCode])
                                    {
                                        data =  this.parentParams[dataSet.datasetId][result[i].params[m].paramCode];
                                    }
                                }else if(this.isDrill == 1 && this.isDrillBack == 2 && this.drillParams)
                                {
                                    if(this.drillParams[result[i].params[m].paramCode])
                                    {
                                        if(this.drillParams[result[i].params[m].paramCode] instanceof Array)
                                        {
                                            data = this.drillParams[result[i].params[m].paramCode]
                                        }else{
                                            data.push(this.drillParams[result[i].params[m].paramCode]);
                                        }
                                    }else{
                                        if(result[i].params[m].paramDefault != null && result[i].params[m].paramDefault != "")
                                        {
                                            data = result[i].params[m].paramDefault.split(",");
                                        } 
                                    }
                                }else{
                                    if(this.$route.query[result[i].params[m].paramCode])
                                    {
                                        data.push(this.$route.query[result[i].params[m].paramCode]);
                                    }else{
                                        if(result[i].params[m].paramDefault != null && result[i].params[m].paramDefault != "")
                                        {
                                            data = result[i].params[m].paramDefault.split(",");
                                        }
                                    }
                                }
                                param[result[i].params[m].paramCode] = data;
                            }else{
                                if(that.isDrillBack == 1)
                                {
                                    if(that.parentParams && that.parentParams[dataSet.datasetId] && that.parentParams[dataSet.datasetId][result[i].params[m].paramCode])
                                    {
                                        param[result[i].params[m].paramCode] =  that.parentParams[dataSet.datasetId][result[i].params[m].paramCode];
                                        tempParams[result[i].params[m].paramCode] = that.parentParams[dataSet.datasetId][result[i].params[m].paramCode];
                                    }
                                    if(result[i].params[m].paramType == "select")
                                    {
                                        let relyOnParams = result[i].params[m].relyOnParams;
                                        let isRelyOnParams = result[i].params[m].isRelyOnParams;
                                        if(isRelyOnParams == 1 && (this.$route.query[relyOnParams] || tempParams[relyOnParams])){
                                            that.getRelyOnParamys(result[i].params[m],this.$route.query[relyOnParams]?this.$route.query[relyOnParams]:tempParams[relyOnParams]);
                                        }
                                    }
                                }else if(this.isDrill == 1 && this.isDrillBack == 2 && this.drillParams)
                                {
                                    if(this.drillParams[result[i].params[m].paramCode])
                                    {
                                        param[result[i].params[m].paramCode] = this.drillParams[result[i].params[m].paramCode];
                                    }else{
                                        if(result[i].params[m].paramDefault != null && result[i].params[m].paramDefault != "")
                                        {
                                            param[result[i].params[m].paramCode] = result[i].params[m].paramDefault
                                        }else{
                                            param[result[i].params[m].paramCode] = "";
                                        }
                                    }
                                }else{
                                    if(this.$route.query[result[i].params[m].paramCode])
                                    {
                                        param[result[i].params[m].paramCode]=this.$route.query[result[i].params[m].paramCode]
                                        if(result[i].params[m].paramType == "select")
                                        {
                                            let relyOnParams = result[i].params[m].relyOnParams;
                                            let isRelyOnParams = result[i].params[m].isRelyOnParams;
                                            if(isRelyOnParams == 1 && (this.$route.query[relyOnParams] || tempParams[relyOnParams])){
                                                that.getRelyOnParamys(result[i].params[m],this.$route.query[relyOnParams]?this.$route.query[relyOnParams]:tempParams[relyOnParams]);
                                            }
                                        }
                                    }else{
                                        if(result[i].params[m].paramDefault != null && result[i].params[m].paramDefault != "")
                                        {
                                            param[result[i].params[m].paramCode] = result[i].params[m].paramDefault
                                        }else{
                                            param[result[i].params[m].paramCode] = "";
                                        }
                                        if(result[i].params[m].paramType == "select")
                                        {
                                            let relyOnParams = result[i].params[m].relyOnParams;
                                            let isRelyOnParams = result[i].params[m].isRelyOnParams;
                                            if(isRelyOnParams == 1 && (this.$route.query[relyOnParams] || tempParams[relyOnParams])){
                                                that.getRelyOnParamys(result[i].params[m],this.$route.query[relyOnParams]?this.$route.query[relyOnParams]:tempParams[relyOnParams]);
                                            }
                                        }
                                    }
                                }
                            }
                            param.paramCode =  result[i].params[m].paramCode;
                            param.dateFormat = result[i].params[m].dateFormat;
                            param.paramHidden = result[i].params[m].paramHidden;
                            param.paramDefault = result[i].params[m].paramDefault;
                            param.paramType = result[i].params[m].paramType;
                            param.checkStrictly = result[i].params[m].checkStrictly;
                            param.paramPrefix = result[i].params[m].paramPrefix;
                            if(!tempParams[result[i].params[m].paramCode]){
                                tempParams[result[i].params[m].paramCode] = result[i].params[m].paramDefault;
                            }
                            dataSet.params.push(param);
                        }
                        this.searchData.params.push(dataSet);
                    }
                    if(this.isDrillBack == 1 && this.isDrill == 2)
                    {
                        this.isDrillBack = 2;
                        this.parentParams = {};
                    }
                    if(result && result.length > 0)
                    {
                        this.activitiName = result[0].datasetName;
                    }
                    if(isPagination && this.tplType == 1)
                    {
                        // this.searchHandle.push({label:'分页导出',icon:'el-icon-download',type:'danger',handle:()=>this.exportPageExcel(),size:'mini'});
                        this.searchHandle.push({btnType:'dropDown',label:'分页导出',icon:'iconfont icon-daochuExcel',type:'success',handle:()=>this.pdfExport(),size:'mini',
                        downs:[{label:'导出excel(当前页)',handle:()=>this.exportPageExcel()},{label:'导出excel(指定页)',handle:()=>this.showCustomPage()}]},);
                        this.searchHandle.push({btnType:'dropDown',label:'分页pdf预览',icon:'iconfont icon-daochuPDF',type:'warning',handle:()=>this.pdfExport(),size:'mini',
                        downs:[{label:'PDF预览(当前页)',handle:()=>this.pdfPageExport(1)},
                        {label:'PDF预览(指定页)',handle:()=>this.showCustomPdfPage(1)}]},)
                        this.searchHandle.push({btnType:'dropDown',label:'分页打印',icon:'el-icon-printer',type:'danger',handle:()=>this.pdfExport(),size:'mini',
                        downs:[{label:'打印(当前页)',handle:()=>this.pdfPagePrint(1)},
                        {label:'打印(指定页)',handle:()=>this.showCustomPdfPage(2)}]},)
                    }
                    this.reportForm = result;
                    this.showReportForm = true;
                    this.isParamMerge = response.responseData.isParamMerge + '';
                    this.isPagination = isPagination;
                    if(response.responseData.isPagination)
                    {
                        this.pageParam.currentPage = response.responseData.pagination.currentPage;
                        this.pageParam.pageCount = response.responseData.pagination.pageCount;
                    }
                    this.$nextTick(() => {
                        // this.initLuckySheet();
                        this.getReportData(1);
                    });
                }
            });
        },
        getRelyOnParamys(item,relyOnValue){
            var params = {
                selectContent: item.selectContent,
                datasourceId: item.datasourceId,
                params: {},
              };
              params.params[item.relyOnParams] = relyOnValue;
              var obj = {
                url: "/api/reportTplDataset/getRelyOnData",
                params: params,
              };
              this.commonUtil.doPost(obj).then((response) => {
                if (response.code == "200") {
                  item.selectData = response.responseData;
                }
              });
        },
        resetSearch:function(){
            this.getReportParam();
        },
        getReportData(isInit){
            var that = this;
            this.$refs['reportRef'].$refs['reportFormRef'].validate((valid) => {
                if (valid) {
                    let apiHeaders = {};
                    if(that.apiHeaders && that.apiHeaders.length > 0){
                        for (let index = 0; index < that.apiHeaders.length; index++) {
                            const element = that.apiHeaders[index];
                            if(that.$route.query[element]){
                                apiHeaders[element] = that.$route.query[element];
                            }
                        }
                    }
                    let tplId = this.currentTplId;
                    let obj = {
                        url:this.apis.previewReport.getLuckyPreviewReportDataApi,
                        params:{tplId:tplId,searchData:this.searchData.params,pagination:this.pageParam,apiHeaders:apiHeaders},
                    }
                    let headers = {};
                    if(this.isShare == 1)
                    {
                        headers.shareCode = this.shareCode;
                        headers.shareUser = this.shareUser;
                        obj.url = this.apis.previewReport.getShareLuckyPreviewReportDataApi
                    }
                    this.loadingText = "报表数据查询中...";
                    this.loading = true;
                    this.commonUtil.doPost(obj,headers) .then(response=>{
                        if (response.code == "200")
                        {
                            this.showReportSql = response.responseData.showReportSql;
                            this.reportSqls = response.responseData.reportSqls;
                            this.tplType = response.responseData.tplType
                            this.tplName = response.responseData.tplName;
                            document.title = response.responseData.tplName;
                            this.reportVersion = response.responseData.version;
                            this.sheetOptions.data = []
                            this.sheetDrillCells = {}
                            if(response.responseData && response.responseData.sheetDatas && response.responseData.sheetDatas.length>0)
                            {
                                for (let index = 0; index < response.responseData.sheetDatas.length; index++) {
                                    const element = response.responseData.sheetDatas[index];
                                    this.recordBasicData(element.cellDatas,element.sheetIndex,element.replacedData);
                                    if(element.newCellDatas)
                                    {
                                        element.cellDatas = [... element.cellDatas, ...element.newCellDatas]
                                    }
                                    if(!element.maxXAndY)
                                    {
                                        element.maxXAndY = {};
                                        element.maxXAndY.maxX = 84;
                                        element.maxXAndY.maxY = 60;
                                    }
                                    var obj={
                                        name:element.sheetName,
                                        celldata:element.cellDatas,
                                        hyperlink:element.hyperlinks,
                                        config:element.config,
                                        frozen:element.frozen,
                                        images:element.images,
                                        calcChain:element.calcChain,
                                        index:element.sheetIndex,
                                        order:element.sheetOrder,
                                        isPivotTable:false,
                                        pivotTable:null,
                                        chart:element.chart,
                                        dataVerification:element.dataVerification,
                                        row:element.maxXAndY?(element.maxXAndY.maxX<=84?84:element.maxXAndY.maxX):84,
                                        column:element.maxXAndY?(element.maxXAndY.maxY<=60?60:element.maxXAndY.maxY):60,
                                        pageDivider:element.pageDivider,
                                        luckysheet_conditionformat_save:element.luckysheetConditionformatSave,
                                        wrapDatas:element.wrapDatas
                                    }
                                    var arr = Object.keys(element.nowFunction);
                                    if(arr.length > 0)
                                    {
                                        this.sheetNowFunction[element.sheetOrder] = element.nowFunction;
                                    }
                                    var functionCellFormat = Object.keys(element.functionCellFormat);
                                    if(functionCellFormat.length > 0)
                                    {
                                        this.sheetFunctionCellFormat[element.sheetOrder] = element.functionCellFormat;
                                    }
                                    if(element.drillCells != null)
                                    {
                                        var drillCells = Object.keys(element.drillCells);
                                        if(drillCells.length > 0)
                                        {
                                            this.sheetDrillCells[element.sheetIndex] = element.drillCells;
                                        }
                                    }
                                    if(response.responseData.showGridlines == 2)
                                    {
                                        obj.showGridLines = 0;
                                    }else{
                                        obj.showGridLines = 1;
                                    }
                                    this.sheetOptions.data.push(obj);
                                    this.extraCustomCellConfigs[element.sheetIndex] = element.extraCustomCellConfigs;
                                    this.extendCellOrigins[element.sheetIndex] = element.extendCellOrigin;
                                    this.columnStartCoords[element.sheetIndex] = element.columnStartCoords
                                    this.cellDatasourceConfigs[element.sheetIndex] = element.cellDatasourceConfig;
                                    this.sheetTableKeys[element.sheetIndex] = element.tableKeys;
                                    this.cellAllowEditConfigs[element.sheetIndex] = element.allowEditConfigs;
                                    
                                    // if(element.pagination && Object.keys(element.pagination).length>0)
                                    // {
                                    //     this.setPagination(element.pagination,response.responseData.isParamMerge,element.mergePagination);
                                    // }
                                }
                                this.dictDatas = response.responseData.cellDictsLabelValue;
                            }
                            this.imgMap = response.responseData.imgCells;
                            if(response.responseData.pagination && Object.keys(response.responseData.pagination).length>0)
                            {
                                var pager = {
                                    pageIndex: response.responseData.pagination.currentPage, //当前的页码
                                    pageSize: response.responseData.pagination.pageCount, //每页显示多少行数据
                                    total: response.responseData.pagination.totalCount, //数据总行数
                                    showTotal:true,
                                    showSkip:true,
                                    selectOption: this.commonConstants.pageCount //允许设置每页行数的选项
                                }
                                this.sheetOptions.pager = pager;
                            }
                            if(response.responseData.showToolbar == 1)
                            {//显示工具栏
                                this.sheetOptions.showtoolbar = true;
                                if(response.responseData.tplType == 1)
                                {
                                    this.sheetOptions.showtoolbarConfig = this.commonConstants.luckysheetPreviewToolBarConfig
                                }else{
                                    this.sheetOptions.showtoolbarConfig = this.commonConstants.luckysheetFormsPreviewToolBarConfig
                                    var index = -1;
                                    for (let t = 0; t < this.searchHandle.length; t++) {
                                        const hanle = this.searchHandle[t];
                                        if(hanle.label == '上报数据')
                                        {
                                            index = t;
                                            break;
                                        }
                                    }
                                    if(index > -1)
                                    {
                                        this.searchHandle.splice(index,2);
                                    }
                                }
                                
                            }else{//不显示工具栏
                                this.sheetOptions.showtoolbar = false;
                                this.sheetOptions.showtoolbarConfig = {}
                                if(response.responseData.tplType == 2 && isInit == 1)
                                {
                                    this.searchHandle.push({label:'上报数据',icon:'el-icon-upload2',type:'success',handle:()=>this.submitDatas(),size:'mini'},);
                                    this.searchHandle.push({label:'修改记录',icon:'iconfont icon-lishijilu',type:'danger',handle:()=>this.getSubmitHis(),size:'mini'},);
                                }
                            }
                            if(response.responseData.showRowHeader == 2)
                            {
                                this.sheetOptions.rowHeaderWidth = 0;
                            }else{
                                this.sheetOptions.rowHeaderWidth = 46;
                            }
                            if(response.responseData.showColHeader == 2)
                            {
                                this.sheetOptions.columnHeaderHeight = 0;
                                this.sheetOptions.sheetFormulaBar = false;
                            }else{
                                this.sheetOptions.columnHeaderHeight = 20;
                                this.sheetOptions.sheetFormulaBar = true;
                            }
                            if(response.responseData.coeditFlag == 1)
                            {
                                const reportTplId = this.currentTplId// reportTplId
                                this.sheetOptions.reportType=this.tplType;
                                this.sheetOptions.isReport=true;
                                this.sheetOptions.allowUpdate=true;
                                this.sheetOptions.gridKey="reportFormsMode-"+reportTplId;
                                this.sheetOptions.updateUrl = location.protocol === 'https:' ? 'wss'+"://"+ location.host +"/SpringReport/api/coedit/websocket/luckysheet" : 'ws'+"://"+ location.host +"/SpringReport/api/coedit/websocket/luckysheet";
                                luckysheet.setServerAttr("reportType",this.tplType);
                            }
                            this.refreshPage = response.responseData.refreshPage;
                            this.initLuckySheet();
                            this.loading = false;
                        }else{
                            this.loading = false;
                        }
                    });
                }else{
                    this.commonUtil.showMessage({message:this.commonUtil.getMessageFromList("error.search.param",null),type: this.commonConstants.messageType.error})
                    this.loading = false;
                    return false;
                }
            });
        },
        setPagination(patination,isParamMerge,mergePagination){
            if(isParamMerge == "1")
            {
                let element = this.searchData.params[0];
                element.params[element.params.length-2].totalCount = mergePagination.totalCount;
                element.params[element.params.length-1].totalPage = mergePagination.totalPage
            }else{
                for (let index = 0; index < this.searchData.params.length; index++) {
                    let element = this.searchData.params[index];
                    if(patination[element.datasetName])
                    {
                        element.params[element.params.length-2].totalCount = patination[element.datasetName].totalCount;
                        element.params[element.params.length-1].totalPage = patination[element.datasetName].totalPage
                    }
                }
            }
            
        },
        exportPageExcel:function(){
            let tplId = this.currentTplId;
            var obj = {
                url:this.apis.reportTpl.getDetailApi,
                params:{id:tplId},
            }
            let headers = {};
            if(this.isShare == 1)
            {
                headers.shareCode = this.shareCode;
                headers.shareUser = this.shareUser;
                obj.url = this.apis.reportTpl.getShareDetailApi;
            }
            this.loadingText = "EXCEL数据导出中...";
            this.loading = true;
            // var chartsBase64 = this.getChartBase64();
            this.commonUtil.doGet(obj,headers).then(response=>{
                if(response.responseData.exportEncrypt == '1')
                {
                    this.$prompt('', '请输入excel文件密码', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        inputType: 'password',
                      }).then(({ value }) => {
                        this.commonUtil.downloadFile(this.isShare == 1?this.apis.previewReport.shareLuckySheetExportExcelApi:this.apis.previewReport.luckySheetExportExcelApi,{tplId:tplId,password:value,searchData:this.searchData.params,isPatination:true,pagination:this.pageParam},this.closeLoading,headers)
                      }).catch(() => {
                      })
                }else{
                    this.commonUtil.downloadFile(this.isShare == 1?this.apis.previewReport.shareLuckySheetExportExcelApi:this.apis.previewReport.luckySheetExportExcelApi,{tplId:tplId,password:"",searchData:this.searchData.params,isPatination:true,pagination:this.pageParam},this.closeLoading,headers)
                }
            });
        },
        exportExcel:function(){
            let tplId = this.currentTplId;
            var params = this.commonUtil.removePageParams(this.searchData.params);
            var obj = {
                url:this.apis.reportTpl.getDetailApi,
                params:{id:tplId},
            }
            let headers = {};
            if(this.isShare == 1)
            {
                headers.shareCode = this.shareCode;
                headers.shareUser = this.shareUser;
                obj.url = this.apis.reportTpl.getShareDetailApi;
            }
            this.loadingText = "EXCEL数据导出中...";
            this.loading = true;
            // var chartsBase64 = this.getChartBase64();
            this.commonUtil.doGet(obj,headers).then(response=>{
                if(response.responseData.exportEncrypt == '1')
                {
                    this.$prompt('', '请输入excel文件密码', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        inputType: 'password',
                        inputValidator: (value) => {       // 点击按钮时，对文本框里面的值进行验证
                            if(!value) {
                                return '请输入密码';
                            }else{
                                this.loading = false;
                            }
                          },
                      }).then(({ value }) => {
                        this.commonUtil.downloadFile(this.isShare == 1?this.apis.previewReport.shareLuckySheetExportExcelApi:this.apis.previewReport.luckySheetExportExcelApi,{tplId:tplId,password:value,searchData:params,isPatination:false,pagination:this.pageParam},this.closeLoading,headers)
                      }).catch(() => {
                        this.loading = false;
                      })
                }else{
                    this.commonUtil.downloadFile(this.isShare == 1?this.apis.previewReport.shareLuckySheetExportExcelApi:this.apis.previewReport.luckySheetExportExcelApi,{tplId:tplId,password:"",searchData:params,isPatination:false,pagination:this.pageParam},this.closeLoading,headers)
                }
            });
        },
        onTogglePager(page){
            this.pageParam.currentPage = page.pageIndex;
            this.pageParam.pageCount = page.pageSize;
            this.getReportData();
        },
        transOnline(){
            let tplId = this.currentTplId;
            let obj = {
                url:this.apis.previewReport.transf2OnlineReportApi,
                params:{tplId:tplId,searchData:this.searchData.params,pagination:this.pageParam,tplName:this.modalData.tplName},
            }
            this.commonUtil.doPost(obj) .then(response=>{
                if (response.code == "200")
                {
                    let id = response.responseData.id
                    let viewReport = this.$router.resolve({ name: 'onlineReport',query: {tplId:id}});
                    window.open(viewReport.href, '_blank');
                }
            });
        },
        closeModal(){
            this.modalConfig.show = false;//关闭modal
            this.commonUtil.clearObj(this.modalData);//清空modalData
            this.$refs['modalRef'].$refs['modalFormRef'].resetFields();//校验重置
        },
        pdfExport:function(pdfType){
            let tplId = this.currentTplId;
            var sheetIndex = luckysheet.getSheet().index;
            var params = this.commonUtil.removePageParams(this.searchData.params);
            // var chartsBase64 = this.getChartBase64();
            var obj = {
                url:this.apis.previewReport.getSheetPdfApi,
                params:{tplId:tplId,searchData:params,isPatination:false,pagination:this.pageParam,sheetIndex:sheetIndex,pdfType:pdfType},
            }
            let headers = {};
            if(this.isShare == 1)
            {
                headers.shareCode = this.shareCode;
                headers.shareUser = this.shareUser;
                obj.url = this.apis.previewReport.getShareSheetPdfApi
            }
            this.loadingText = "正在生成PDF文件...";
            this.loading = true;
            obj.callback = this.closeLoading;
            this.commonUtil.doPost(obj,headers) .then(response=>{
                if (response.code == "200")
                {
                    window.open(response.responseData.fileUrl, '_blank');
                }
            });
        },
        pdfPageExport:function(pdfType){
            let tplId = this.currentTplId;
            var sheetIndex = luckysheet.getSheet().index;
            var params = this.commonUtil.removePageParams(this.searchData.params);
            // var chartsBase64 = this.getChartBase64();
            var obj = {
                url:this.apis.previewReport.getSheetPdfApi,
                params:{tplId:tplId,searchData:params,isPatination:true,pagination:this.pageParam,sheetIndex:sheetIndex,pdfType:pdfType},
            }
            let headers = {};
            if(this.isShare == 1)
            {
                headers.shareCode = this.shareCode;
                headers.shareUser = this.shareUser;
                obj.url = this.apis.previewReport.getShareSheetPdfApi
            }
            this.loadingText = "正在生成PDF文件...";
            this.loading = true;
            obj.callback = this.closeLoading;
            this.commonUtil.doPost(obj,headers) .then(response=>{
                if (response.code == "200")
                {
                    window.open(response.responseData.fileUrl, '_blank');
                }
            });
        },
        //鼠标点击单元格
        cellMousedown:function(cell,postion,sheetFile,ctx){
            var r = postion.r
            var c = postion.c;
            var index = sheetFile.index;
            var cellDrill = this.sheetDrillCells[index];
            if(cellDrill)
            {
                var key = r + "_" + c;
                if(cellDrill[key])
                {
                    var drillId = cellDrill[key].drillId+"";
                    var drillParams = cellDrill[key].drillParams;
                    this.drill(drillId,drillParams);
                }
            }else{
                this.ctx = ctx;
                this.clickCellPosition = postion;
            }
        },
        //报表下钻
        drill(drillId,drillParams){
            //获取当前报表的参数
            var parentId = this.currentTplId;//上一级的报表id
            var parentParams = {};//上一级参数
            var pageParams = {};//当前页面参数
            if(this.searchData.params && this.searchData.params.length > 0)
            {
                for (let index = 0; index < this.searchData.params.length; index++) {
                    const element = this.searchData.params[index];
                    let datasetId = element.datasetId;
                    let params = element.params;
                    if(params && params.length > 0)
                    {
                        if(!parentParams[datasetId])
                        {
                            parentParams[datasetId] = {}
                        }
                        for (let t = 0; t < params.length; t++) {
                            const param = params[t];
                            parentParams[datasetId][param.paramCode] = param[param.paramCode];
                            pageParams[param.paramCode] = param[param.paramCode];
                        }
                    }
                }
            }
            var parentInfo = {
                parentId:parentId,
                parentParams:parentParams
            }
            this.drillRelations[drillId] = parentInfo;
            this.currentTplId = drillId;
            this.drillParams = { ...pageParams, ...drillParams };
            this.isDrill = 1;
            this.isDrillBack = 2;
            this.getReportParam();
        },
        back(){
            //获取上一级报表信息
            this.isDrillBack = 1;
            var parent = this.drillRelations[this.currentTplId];
            this.parentParams = parent.parentParams;
            delete this.drillRelations[this.currentTplId];//删除下钻报表信息
            this.currentTplId = parent.parentId;//当前报表id更新
            if(!this.drillRelations[this.currentTplId])
            {//判断是否还有上级报表
                this.isDrill = 2;
            }
            this.getReportParam();
        },
        //显示自定义页数页面
        showCustomPage(){
            this.pageDialogVisiable = true;
        },
        closePageDialog(){
            this.pageDialogVisiable = false;
            this.$refs['pageFormRef'].resetFields();//校验重置
            this.commonUtil.clearObj(this.pageForm);//清空modalData
        },
        customPageExport(){
            this.$refs['pageFormRef'].validate((valid) => {
                if (valid) {
                    let tplId = this.currentTplId;
                    var obj = {
                        url:this.apis.reportTpl.getDetailApi,
                        params:{id:tplId},
                    }
                    let headers = {};
                    if(this.isShare == 1)
                    {
                        headers.shareCode = this.shareCode;
                        headers.shareUser = this.shareUser;
                        obj.url = this.apis.reportTpl.getShareDetailApi;
                    }
                    this.loadingText = "EXCEL数据导出中...";
                    this.loading = true;
                    // var chartsBase64 = this.getChartBase64();
                    this.commonUtil.doGet(obj,headers).then(response=>{
                        if(response.responseData.exportEncrypt == '1')
                        {
                            this.$prompt('', '请输入excel文件密码', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                inputType: 'password',
                              }).then(({ value }) => {
                                this.commonUtil.downloadFile(this.isShare == 1?this.apis.previewReport.shareLuckySheetExportExcelApi:this.apis.previewReport.luckySheetExportExcelApi,{tplId:tplId,password:value,searchData:this.searchData.params,isPatination:true,isCustomerPage:1,startPage:this.pageForm.startPage,endPage:this.pageForm.endPage,pagination:this.pageParam},this.closeLoading,headers)
                              }).catch(() => {
                                this.loading = false;
                              })
                        }else{
                            this.commonUtil.downloadFile(this.isShare == 1?this.apis.previewReport.shareLuckySheetExportExcelApi:this.apis.previewReport.luckySheetExportExcelApi,{tplId:tplId,password:"",searchData:this.searchData.params,isPatination:true,isCustomerPage:1,startPage:this.pageForm.startPage,endPage:this.pageForm.endPage,pagination:this.pageParam},this.closeLoading,headers)
                        }
                        this.closePageDialog(); 
                    });
                }
              })
        },
        showCustomPdfPage(type){
            this.pdfPageDialogVisiable = true;
            this.pdfPageDialogType = type;
        },
        closePdfPageDialog(){
            this.pdfPageDialogVisiable = false;
            this.$refs['pdfPageFormRef'].resetFields();//校验重置
            this.commonUtil.clearObj(this.pdfPageForm);//清空modalData
        },
        customPdfPageExport(){
            this.$refs['pdfPageFormRef'].validate((valid) => {
                if (valid) {
                    let tplId = this.currentTplId;
                    var sheetIndex = luckysheet.getSheet().index;
                    var params = this.commonUtil.removePageParams(this.searchData.params);
                    var pdfType = this.pdfPageForm.type;
                    // var chartsBase64 = this.getChartBase64();
                    var obj = {
                        url:this.apis.previewReport.getSheetPdfApi,
                        params:{tplId:tplId,searchData:params,isPatination:true,pagination:this.pageParam,sheetIndex:sheetIndex,pdfType:pdfType,isCustomerPage:1,startPage:this.pdfPageForm.startPage,endPage:this.pdfPageForm.endPage},
                    }
                    this.loading = true;
                    if(this.pdfPageDialogType == 1)
                    {
                        this.loadingText = "正在生成PDF文件...";
                        obj.url = this.apis.previewReport.getSheetPdfApi;
                        obj.callback = this.closeLoading;
                    }else{
                        this.loadingText = "打印中...";
                        obj.url = this.apis.previewReport.getSheetPdfStreamApi
                    }
                    let headers = {};
                    if(this.isShare == 1)
                    {
                        headers.shareCode = this.shareCode;
                        headers.shareUser = this.shareUser;
                        if(this.pdfPageDialogType == 1)
                        {
                            obj.url = this.apis.previewReport.getShareSheetPdfApi
                        }else{
                            obj.url = this.apis.previewReport.getShareSheetPdfStreamApi
                        }
                        
                    }
                    this.closePdfPageDialog();
                    try {
                        if(this.pdfPageDialogType == 1)
                        {
                            this.commonUtil.doPost(obj,headers) .then(response=>{
                                if (response.code == "200")
                                {
                                    window.open(response.responseData.fileUrl, '_blank');
                                }
                            });
                        }else{
                            this.commonUtil.printPdf(obj.url,obj.params,headers,this.closeLoading);
                        }
                    } catch (error) {
                        this.loading = false
                    }
                    
                }
              })
        },
        getMobile:function(){
            let tplId = this.currentTplId;
            var sheetIndex = luckysheet.getSheet().index;
            var params = this.commonUtil.removePageParams(this.searchData.params);
            var obj = {
                url:this.apis.previewReport.getMobileReportApi,
                params:{tplId:tplId,searchData:params,isPatination:false,pagination:this.pageParam,sheetIndex:sheetIndex},
            }
            let headers = {};
            if(this.isShare == 1)
            {
                headers.shareCode = this.shareCode;
                headers.shareUser = this.shareUser;
                obj.url = this.apis.previewReport.getShareSheetPdfApi
            }
            this.commonUtil.doPost(obj,headers) .then(response=>{
                if (response.code == "200")
                {
                }
            });
        },
        getChartBase64:function(){
            var result = null;
            var luckysheetfiles = luckysheet.getLuckysheetfile()
            for (let index = 0; index < luckysheetfiles.length; index++) {
                const luckysheetfile = luckysheetfiles[index]
                var charts = luckysheetfile.chart;
                if(charts && charts.length > 0)
                {
                    for (let t = 0; t < charts.length; t++) {
                        if(result == null)
                        {
                            result = {};
                        }
                        const chart = charts[t];
                        var chartId = chart.chart_id;
                        var chart_id_c = chart.chart_id + "_c";
                        let baseCanvas = document.getElementById(chart_id_c).getElementsByTagName('canvas')[0]
                        let width = baseCanvas.width;
                        let height = baseCanvas.height;
                        let ctx = baseCanvas.getContext("2d");
                        ctx.drawImage(baseCanvas,width,height);
                        var base64 = baseCanvas.toDataURL()
                        result[chartId] = base64;
                    }
                }
            }
            return result;
        },
        pdfPrint:function(pdfType){
            let tplId = this.currentTplId;
            var sheetIndex = luckysheet.getSheet().index;
            var params = this.commonUtil.removePageParams(this.searchData.params);
            // var chartsBase64 = this.getChartBase64();
            var obj = {
                url:this.apis.previewReport.getSheetPdfStreamApi,
                params:{tplId:tplId,searchData:params,isPatination:false,pagination:this.pageParam,sheetIndex:sheetIndex,pdfType:pdfType},
            }
            let headers = {};
            if(this.isShare == 1)
            {
                headers.shareCode = this.shareCode;
                headers.shareUser = this.shareUser;
                obj.url = this.apis.previewReport.getShareSheetPdfStreamApi
            }
            this.loadingText = "打印中...";
            this.loading = true;
            try {
                this.commonUtil.printPdf(obj.url,obj.params,headers,this.closeLoading);
            } catch (error) {
                this.loading = false;
            }
        },
        closeLoading(){
            this.loading = false;
        },
        pdfPagePrint:function(pdfType){
            let tplId = this.currentTplId;
            var sheetIndex = luckysheet.getSheet().index;
            var params = this.commonUtil.removePageParams(this.searchData.params);
            // var chartsBase64 = this.getChartBase64();
            var obj = {
                url:this.apis.previewReport.getSheetPdfStreamApi,
                params:{tplId:tplId,searchData:params,isPatination:true,pagination:this.pageParam,sheetIndex:sheetIndex,pdfType:pdfType},
            }
            let headers = {};
            if(this.isShare == 1)
            {
                headers.shareCode = this.shareCode;
                headers.shareUser = this.shareUser;
                obj.url = this.apis.previewReport.getShareSheetPdfStreamApi
            }
            this.loadingText = "打印中...";
            this.loading = true;
            try {
                this.commonUtil.printPdf(obj.url,obj.params,headers,this.closeLoading);
            } catch (error) {
                this.loading = false;
            }
        },
        cellEditBefore(range){
            var r = range[0].row[0];
            var c = range[0].column[0];
            this.editR = r;
            this.editC = c;
            var key = r+"_"+c;
            var sheetIndex = luckysheet.getSheet().index;
            var that = this;
            //判断该单元格是否可编辑
            if(this.cellAllowEditConfigs[sheetIndex])
            {
                var orginCell = this.extendCellOrigins[sheetIndex][key];
                if(orginCell)
                {
                    var allowEdit = this.cellAllowEditConfigs[sheetIndex][orginCell.r+"_"+orginCell.c];
                    if(!allowEdit)
                    {
                        this.commonUtil.showMessage({message:"该单元格不允许进行编辑。",type: "error"})
                        return false;
                    }
                }
            }
            that.editBeforeValue = luckysheet.getCellValue(r,c);
            if(this.extendCellOrigins[sheetIndex])
            {
                var orginCell = this.extendCellOrigins[sheetIndex][key];
                if(!orginCell)
                {
                    orginCell = this.getNewCellExtendOrigins(sheetIndex,r,c);
                }
                if(orginCell && this.extraCustomCellConfigs[sheetIndex])
                {
                    var key2 = orginCell.r + "_" + orginCell.c;
                    this.rules = {};
                    this.cellConfig = this.extraCustomCellConfigs[sheetIndex][key2];
                    if(this.cellConfig.require)
                    {
                        this.rules.required = true;
                    }
                    if(this.cellConfig.valueType == '1')
                    {//文本
                        // this.textValidateRules();
                    }else if(this.cellConfig.valueType == '2'){
                        //数值
                        // this.numberValidateRules();
                    }else if(this.cellConfig.valueType == '3'){
                        //日期
                        this.dateValidRules();
                        this.editDialog = true;
                        luckysheet.setCellFormat(that.editR,that.editC, "ct", {fa:"@", t:"s"})
                        setTimeout(function () {
                            luckysheet.exitEditMode();
                            luckysheet.setCellValue(that.editR,that.editC,that.editBeforeValue,{isRefresh:false});
                            luckysheet.setRangeShow({row:[that.editR,that.editR],column:[that.editC,that.editC]});
                        }, 0);
                    }else if(this.cellConfig.valueType == '4'){
                        //下拉选择
                        this.selectValidRules();
                        if(this.cellConfig.datasourceId && this.cellConfig.dictType)
                        {
                            this.getDictTypeDatas();
                        }
                        this.editDialog = true;
                        setTimeout(function () {
                            luckysheet.exitEditMode();
                            luckysheet.setCellValue(that.editR,that.editC,that.editBeforeValue,{isRefresh:false});
                            luckysheet.setRangeShow({row:[that.editR,that.editR],column:[that.editC,that.editC]});
                        }, 0);
                    }
                    
                }
            }
        },
        cellUpdated(r,c,oldValue,newValue,isRefresh){
            var sheetIndex = luckysheet.getSheet().index;
            if(this.extendCellOrigins[sheetIndex])
            {
                let originCell = this.extendCellOrigins[sheetIndex][r+"_"+c];
                if(!originCell)
                {
                    originCell = this.getNewCellExtendOrigins(sheetIndex,r,c);
                }
                if(originCell)
                {
                    var v = newValue?newValue.m:"";
                    if(v)
                    {
                        v = v.trim();
                    }
                    var wrongMsg = [];
                    const extraConfig = this.extraCustomCellConfigs[sheetIndex][originCell.r + "_" + originCell.c];
                    var rowFlag = 0;
                    if(extraConfig.cellExtend == 1)
                    {//不扩展
                        rowFlag = 0;
                    }else if(extraConfig.cellExtend == 2)
                    {//向右扩展
                        rowFlag = c - originCell.c;
                    }else if(extraConfig.cellExtend == 3)
                    {//向下扩展
                        rowFlag = r - originCell.r;
                    }
                    this.dataVerify(r,c,originCell.r,originCell.c,v,sheetIndex,wrongMsg,rowFlag,extraConfig.cellExtend)
                    if(wrongMsg && wrongMsg.length > 0)
                    {
                        this.errorCellSetting(r,c,wrongMsg,null);
                    }else{
                        this.removeErrorSetting(r,c,null);
                    }
                    var cellData = luckysheet.getSheet().data[r][c];
                    if(cellData)
                    {
                        var obj = {
                            r:r,
                            c:c,
                            isPagination:this.isPagination,
                            pageIndex:this.sheetOptions.pager.pageIndex,
                            pageSize:this.sheetOptions.pager.pageSize,
                            value:{r:r,c:c,v:cellData}
                        }
                        let tplId = this.$route.query.tplId;
                        luckysheet.sendServerMsg("reportCellChanged", tplId+"-"+sheetIndex,obj,{ "k": "cellChanged"});
                    }
                }
            }
        },
        //选中单元格清除事件
        rangeClear(){
            var sheetIndex = luckysheet.getSheet().index;
            if(this.cellAllowEditConfigs[sheetIndex])
            {
                var denyEditCells = [];//不允许编辑的单元格
                var cells = this.getSelectRangeCells(null);
                if(cells && cells.length > 0)
                {
                    for (let index = 0; index < cells.length; index++) {
                        const element = cells[index];
                        var key = element[0]+"_"+element[1];
                        var orginCell = this.extendCellOrigins[sheetIndex][key];
                        if(orginCell)
                        {
                            var allowEdit = this.cellAllowEditConfigs[sheetIndex][orginCell.r+"_"+orginCell.c]; 
                            if(!allowEdit)
                            {
                                denyEditCells.push(element);
                            }
                        }
                    }
                    if(denyEditCells && denyEditCells.length > 0)
                    {
                        for (let index = 0; index < denyEditCells.length; index++) {
                            const element = denyEditCells[index];
                            var orginalCellValue = this.selectCellValueMap[element[0]+"_"+element[1]];
                            luckysheet.setCellValue(element[0],element[1],orginalCellValue,{isRefresh:false})
                        }
                        this.commonUtil.showMessage({message:"选中的单元格中有不允许进行编辑的数据，不允许将数据删除。",type: "error"})
                    }
                }
            }
        },
        //选中单元格事件
        rangeSelect(sheet,range){
            var sheetIndex = sheet.index;
            this.selectCellValueMap = {};
            if(this.extendCellOrigins[sheetIndex])
            {
                let cells = this.getSelectRangeCells(range);
                for (let index = 0; index < cells.length; index++) {
                    let cell = cells[index];
                    let r = cell[0];
                    let c = cell[1];
                    if(this.extendCellOrigins[sheetIndex][r+"_"+c])
                    {
                        let cellValue = luckysheet.getCellValue(r,c,{type:"v"});
                        this.selectCellValueMap[r+"_"+c] = cellValue;
                    }
                }
            }
        },
        getSelectRangeCells(range){
            var cells = [];
            var selectedRanges;
            if(range)
            {
                selectedRanges = range;
            }else{
                selectedRanges = luckysheet.getRange();
            }
            if(selectedRanges && selectedRanges.length>0)
            {
                for (let index = 0; index < selectedRanges.length; index++) {
                    const range = selectedRanges[index];
                    for (let r = range.row[0]; r <= range.row[1]; r++) {
                        for (let c = range.column[0]; c <= range.column[1]; c++) {
                            var cell = [r,c];
                            cells.push(cell)
                        }
                    }
                }
            }
            return cells;
        },
        errorCellSetting(r,c,wrongMsg,order){
            var comment = "";
            for (let index = 0; index < wrongMsg.length; index++) {
                const element = wrongMsg[index];
                comment = comment + element;
            }
            var ps = {
                "left": null,
                "top": null,
                "width": null,
                "height": null,
                "value": comment,
                "isshow": false
            }
            // v.ps = ps;
            // v.bg = "#ffd966";
            luckysheet.setCellFormat(r,c,"ps",ps,order);
            luckysheet.setCellFormat(r,c,"bg","#ff0000",order);
        },
        removeErrorSetting(r,c,order){
            var key = r+"_"+c;
            var sheetIndex = luckysheet.getSheet().index;
            var orginCell = this.extendCellOrigins[sheetIndex][key];
            if(!orginCell)
            {
                orginCell = this.getNewCellExtendOrigins(sheetIndex,r,c);
            }
            if(orginCell.ps)
            {
                luckysheet.setCellFormat(r,c,"ps",null,order);
                luckysheet.setCellFormat(r,c,"ps",orginCell.ps,order);
            }else{
                luckysheet.setCellFormat(r,c,"ps",null,order);
            }
            if(orginCell.bg){
                luckysheet.setCellFormat(r,c,"bg",orginCell.bg,order);
            }else{
                luckysheet.setCellFormat(r,c,"bg",null,order);
            }
        },
        closeEditDialog(){
            this.editForm.cellContent = "";
            this.cellConfig = {};
            this.dateFormat = "";
            this.rules = {};
            this.dictTypeDatas = [];
            this.editR = null;
            this.editC = null;
            this.editBeforeValue = "";
            this.editDialog = false;
        },
        confirmEdit(){
            this.$refs['editFormRef'].validate((valid) => {
                if (valid) {
                    luckysheet.setCellValue(this.editR,this.editC,this.editForm.cellContent+"",{isRefresh:false});
                    luckysheet.setRangeShow({row:[this.editR,this.editR],column:[this.editC,this.editC]});
                    this.removeErrorSetting(this.editR,this.editC,null);
                    this.closeEditDialog();
                }
            });
        },
        textValidateRules() {
            if(this.cellConfig.require)
            {
                this.rules.required = true;
            }
            if (this.cellConfig.lengthValid) {
                if (this.cellConfig.minLength) {
                    this.rules.minLength = this.cellConfig.minLength;
                }
                if (this.cellConfig.maxLength) {
                    this.rules.maxLength = this.cellConfig.maxLength;
                }
            }
            if (this.cellConfig.textValidRule) {
                switch (this.cellConfig.textValidRule) {
                    case '1':
                        this.rules.type = "email";
                        break;
                    case '2':
                        this.rules.type = "mobile";
                        break;
                    case '3':
                        this.rules.type = "phone";
                        break;
                    case '4':
                        this.rules.type = "idcard";
                        break;
                    case '99':
                        if (this.cellConfig.regex) {
                            this.rules.regexp = this.cellConfig.regex;
                        }
                        break;
                    default:
                        break;
                }
            }
        },
        numberValidateRules(){
            if(this.cellConfig.require)
            {
                this.rules.required = true;
            }
            if(this.cellConfig.numberRangeValid)
            {
                if(this.cellConfig.minValue != null && this.cellConfig.minValue != "" && this.cellConfig.minValue != undefined && !isNaN(parseFloat(this.cellConfig.minValue)))
                {
                    this.rules.min = parseFloat(this.cellConfig.minValue);
                }
                if(this.cellConfig.maxValue != null && this.cellConfig.maxValue != "" && this.cellConfig.maxValue != undefined && !isNaN(parseFloat(this.cellConfig.minValue)))
                {
                    this.rules.max = parseFloat(this.cellConfig.maxValue);
                }
            }
            if(this.cellConfig.digit && !isNaN(parseFloat(this.cellConfig.digit)))
                {
                    var float = parseInt(this.cellConfig.digit);
                    if(float >0)
                    {
                        this.rules.type = "number";
                        this.rules.float = float;
                    }else{
                        this.rules.type = "integer";
                    }
                }else{
                    this.rules.type = "integer";
                }
        },
        dateValidRules(){
            this.dateFormat = this.cellConfig.dateFormat;
            if(this.cellConfig.require)
            {
                this.rules.required = true;
            }
        },
        selectValidRules(){
            if(this.cellConfig.require)
            {
                this.rules.required = true;
            }
        },
        //获取数据字典值
        getDictTypeDatas(){
            let obj = {
                url:this.apis.reportDatasourceDictData.getDictDatasApi,
                params:{datasourceId:this.cellConfig.datasourceId,dictType:this.cellConfig.dictType},
                removeEmpty:false,
            }
            let headers = {};
            if(this.isShare == 1)
            {
                headers.shareCode = this.shareCode;
                headers.shareUser = this.shareUser;
                obj.url = this.apis.reportDatasourceDictData.getShareDictDatasApi
            }
            this.commonUtil.doPost(obj,headers) .then(response=>{
                if (response.code == "200")
                {
                    this.dictTypeDatas = response.responseData;
                }
            });
        },
        //提交数据
        submitDatas(){
            var msgMap =  this.processDatas();
            if(msgMap && Object.keys(msgMap).length > 0)
            {
                for(var key in msgMap)
                {
                    var order = key.split("_")[0];
                    var r = key.split("_")[1];
                    var c = key.split("_")[2];
                    this.errorCellSetting(r,c,msgMap[key],{order:order});
                }
                this.commonUtil.showMessage({message:"有未正确填写的数据，请全部填写正确后再提交。",type: "error"});
                return;
            }else{
                let tplId = this.$route.query.tplId;
                let headers = {};
                if(this.isShare == 1)
                {
                    headers.shareCode = this.shareCode;
                    headers.shareUser = this.shareUser;
                    obj.url = this.apis.previewReport.shareReportDataApi
                }
                var that = this;
                let bassicMd5 = this.$md5(JSON.stringify(this.basicRowDatas));//旧数据md5值
                let rowMd5 = this.$md5(JSON.stringify(this.rowDatas));//新数据md5值
                let reportDatas = {};//上报的数据
                let originalDatas = {};//原始数据
                if(bassicMd5 == rowMd5)
                {//说明值未发生变化，直接返回
                    this.commonUtil.showMessage({message:"未修改过数据，无需提交数据。",type: "warning"});
                    return;
                }else{
                    for(var key in this.rowDatas) {
                        if(this.basicRowDatas[key])
                        {
                            bassicMd5 = this.$md5(JSON.stringify(this.basicRowDatas[key]));//旧数据md5值
                            rowMd5 = this.$md5(JSON.stringify(this.rowDatas[key]));//旧数据md5值
                            if(bassicMd5 != rowMd5){
                                originalDatas[key] = this.basicRowDatas[key];
                                reportDatas[key] = this.rowDatas[key];
                            }
                        }else{
                            if(this.checkRequiredAttr(key,this.rowDatas[key]))
                            {
                                reportDatas[key] = this.rowDatas[key];
                            }else{
                                var data = this.addDataCoords[key];
                                if(data)
                                {
                                    let cellExtend = data.cellExtend;
                                    let name = data.name;
                                    let r = data.r;
                                    let c = data.c;
                                    if(3 == cellExtend)
                                    {
                                        this.commonUtil.showMessage({message:"【"+name+"】的第"+(c+1)+"列有必填项未填写，请填写完全后再提交。",type: "error"}); 
                                    }else{
                                        this.commonUtil.showMessage({message:"【"+name+"】的第"+(r+1)+"行有必填项未填写，请填写完全后再提交。",type: "error"}); 
                                    }
                                    this.addDataCoords = {};
                                    return;
                                }else{
                                    this.commonUtil.showMessage({message:"有必填项未填写，请填写完全后再提交。",type: "error"}); 
                                    this.addDataCoords = {};
                                    return;
                                }
                            }
                        }
                    }
                }
                this.loadingText = "数据上传中...";
                this.loading = true;
                let obj = {
                    url:this.apis.previewReport.reportDataApi,
                    params:{reportDatas:reportDatas,datasKey:this.datasKey,basicDatas:originalDatas,tplId:tplId,version:this.reportVersion,reCalculate:this.reCalculate},
                    removeEmpty:false,
                    callback:this.submitDatasCallback
                }
                this.commonUtil.doPost(obj,headers) .then(response=>{
                    if (response.code == "200")
                    {
                        if(that.refreshPage == 1)
                        {
                            that.$router.go(0);
                        }else{
                            that.reportVersion = response.responseData.version;
                            var luckysheetfiles = luckysheet.getLuckysheetfile();
                            if(luckysheetfiles){
                                for (let index = 0; index < luckysheetfiles.length; index++) {
                                    const luckysheetfile = luckysheetfiles[index];
                                    const mergedObj = {...that.basicData[luckysheetfile.index], ...that.submitBasicData[luckysheetfile.index]};
                                    that.basicData[luckysheetfile.index] = mergedObj;
                                }
                            }
                            that.submitBasicData = {};
                            that.addDataCoords = {};
                            that.formsDatasourceAttrs = {}
                        }
                    }
                });
            }
            
        },
        submitDatasCallback(){
            this.loading = false;
        },
        //校验新增数据必填属性是否都填了
        checkRequiredAttr(key,data){
            let result = true;
            var sheetIndex = key.split("|")[0];
            var datasourceId = key.split("|")[1];
            var tableName = key.split("|")[2];
            var configName = key.split("|")[3];
            var attrKey = sheetIndex + "|" + datasourceId + "|" + tableName + "|" + configName;
            if(this.formsDatasourceAttrs[sheetIndex] && this.formsDatasourceAttrs[sheetIndex][attrKey] && this.formsDatasourceAttrs[sheetIndex][attrKey].length > 0)
            {
                for (let index = 0; index < this.formsDatasourceAttrs[sheetIndex][attrKey].length; index++) {
                    const attr = this.formsDatasourceAttrs[sheetIndex][attrKey][index];
                    if(!data[attr])
                    {
                        result = false;
                        break;
                    }
                }
            }
            return result;
        },
        processDatas(){
            var luckysheetfiles = luckysheet.getLuckysheetfile();
            var msgMap = {};
            if(luckysheetfiles)
            {
                this.submitBasicData = {};
                for (let index = 0; index < luckysheetfiles.length; index++) {
                    const luckysheetfile = luckysheetfiles[index];
                    if(!luckysheetfile.isPivotTable)
                    {
                        var cellDatas = this.getCellDatas(luckysheetfile);
                        const sheetIndex = luckysheetfile.index;
                        this.submitBasicData[sheetIndex] = {};
                        for (let t = 0; t < cellDatas.length; t++) {
                            var wrongMsg = [];
                            const element = cellDatas[t];
                            const r = element.r;
                            const c = element.c;
                            let v = element.v.m
                            //获取原始单元格的坐标信息
                            let originCell = this.extendCellOrigins[sheetIndex][r+"_"+c];
                            let isNew = false;
                            if(!originCell)
                            {
                                originCell = this.getNewCellExtendOrigins(sheetIndex,r,c);
                                isNew = true;
                            }
                            if(originCell)
                            {
                                const cellDatasourceConfig = this.cellDatasourceConfigs[sheetIndex];
                                if(cellDatasourceConfig)
                                {
                                    //获取原始单元格自定义配置信息
                                    const extraConfig = this.extraCustomCellConfigs[sheetIndex][originCell.r + "_" + originCell.c];
                                    //原始坐标对应的实际数据的起始坐标
                                    const startCoords = this.columnStartCoords[sheetIndex][originCell.r + "_" + originCell.c];
                                    //获取原始单元格绑定的数据源信息
                                    const datasourceConfig = this.cellDatasourceConfigs[sheetIndex][originCell.r + "_" + originCell.c];
                                    if(extraConfig && startCoords && datasourceConfig)
                                    {
                                        var rowFlag = 0;
                                        if(extraConfig.cellExtend == 1)
                                        {//不扩展
                                            rowFlag = 0;
                                        }else if(extraConfig.cellExtend == 2)
                                        {//向右扩展
                                            rowFlag = c - originCell.c;
                                        }else if(extraConfig.cellExtend == 3)
                                        {//向下扩展
                                            rowFlag = r - originCell.r;
                                        }
                                        const dictKey = sheetIndex + "_" + originCell.r + "_" + originCell.c;
                                        if(this.dictDatas)
                                        {
                                            var dict = this.dictDatas[dictKey];
                                            if(dict)
                                            {
                                                v = dict[v];
                                            }
                                        }
                                        const rowKey = sheetIndex + "|" + datasourceConfig.datasourceId + "|" + datasourceConfig.table + "|" + datasourceConfig.name + "|" + rowFlag;
                                        if(extraConfig.unitTransfer && this.commonUtil.isNumber(v))
                                        {
                                            var transferType = extraConfig.transferType;
                                            var multiple = Number(extraConfig.multiple);
                                            var digit = Number(extraConfig.digit);
                                            var obj = {
                                                transferType:transferType,
                                                multiple:multiple,
                                                digit:digit
                                            }
                                            const columnKey = rowKey+"|"+datasourceConfig.columnName;
                                            this.reCalculate[columnKey] = obj;
                                        }
                                        var data = this.rowDatas[rowKey];
                                        var basicData = this.basicRowDatas[rowKey];
                                        if(data)
                                        {
                                            data[datasourceConfig.columnName] = (v==undefined?null:v);
                                            if(isNew)
                                            {
                                                if(!this.addDataCoords[rowKey])
                                                {
                                                    this.addDataCoords[rowKey] = {r:r,c:c,extend:extraConfig.cellExtend,name:luckysheetfile.name}
                                                }
                                            }
                                        }else{
                                            data = {};
                                            data[datasourceConfig.columnName] = (v==undefined?null:v);
                                            this.rowDatas[rowKey] = data
                                            if(isNew)
                                            {
                                                if(!this.addDataCoords[rowKey])
                                                {
                                                    this.addDataCoords[rowKey] = {r:r,c:c,extend:extraConfig.cellExtend,name:luckysheetfile.name}
                                                }
                                            }
                                        }
                                        if(this.basicData[sheetIndex])
                                        {
                                            var basicV = this.basicData[sheetIndex][r+'_'+c];
                                            if(this.dictDatas)
                                            {
                                                var dict = this.dictDatas[dictKey];
                                                if(dict)
                                                {
                                                    basicV = dict[basicV];
                                                }
                                            }
                                            if(!isNew)
                                            {
                                                if(basicData)
                                                {
                                                    basicData[datasourceConfig.columnName] = basicV;
                                                }else{
                                                    basicData = {};
                                                    basicData[datasourceConfig.columnName] = basicV;
                                                    this.basicRowDatas[rowKey] = basicData
                                                }
                                            }
                                        }
                                        if(this.refreshPage == 2)
                                        {
                                            this.submitBasicData[sheetIndex][r+"_"+c] = v;
                                        }
                                        if(extraConfig.require)
                                        {
                                            const attrKey = sheetIndex + "|" + datasourceConfig.datasourceId + "|" + datasourceConfig.table + "|" + datasourceConfig.name;
                                            if(!this.formsDatasourceAttrs[sheetIndex])
                                            {
                                                this.formsDatasourceAttrs[sheetIndex] = {};
                                                this.formsDatasourceAttrs[sheetIndex][attrKey] = [];
                                            }
                                            this.formsDatasourceAttrs[sheetIndex][attrKey].push(datasourceConfig.columnName)
                                        }
                                        //校验填入的数据格式
                                        this.dataVerify(r,c,originCell.r,originCell.c,v,sheetIndex,wrongMsg,rowFlag,extraConfig.cellExtend)
                                        if(wrongMsg && wrongMsg.length > 0)
                                        {
                                            msgMap[luckysheetfile.order+"_"+r+"_"+c] = wrongMsg;
                                        }
                                        const tableKeys = this.sheetTableKeys[sheetIndex];
                                        if(tableKeys)
                                        {
                                            for(var tableKey in tableKeys)
                                            {
                                                var datasourceId = tableKey.split("|")[0];
                                                var tableName = tableKey.split("|")[1];
                                                var columnName = tableKey.split("|")[2];
                                                var name = tableKey.split("|")[3];
                                                const rowDatasKey = sheetIndex + "|" + datasourceId + "|" + tableName + "|" + name + "|" + rowFlag;
                                                if(this.rowDatas[rowDatasKey] && !this.rowDatas[rowDatasKey][columnName])
                                                {
                                                    this.rowDatas[rowDatasKey][columnName] = null;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        let tableKeys = this.sheetTableKeys[sheetIndex];
                        if(tableKeys)
                        {
                            for(var key in tableKeys)
                            {
                                var datasourceId = key.split("|")[0];
                                var tableName = key.split("|")[1];
                                var columnName = key.split("|")[2];
                                var name = key.split("|")[3];
                                const keykey = sheetIndex + "|" + datasourceId + "|" + tableName + "|" + columnName + "|" + name;
                                this.datasKey[keykey] = tableKeys[key]
                            }
                        }
                    }
                }
            }
            return msgMap;
        },
        //获取新增单元格对应的原始数据
        //获取x坐标相邻的单元格，最多获取5个相邻的单元格，如果获取不到那就忽略该单元格
        getNewCellExtendOrigins(sheetIndex,r,c){
            let originCell = null;
            if(this.addExtendCellOrigins[sheetIndex] && this.addExtendCellOrigins[sheetIndex][r+"_"+c])
            {
                originCell = this.addExtendCellOrigins[sheetIndex][r+"_"+c];
                return originCell;
            }
            for (let index = 1; index <= 5; index++) {
                let prevr = r - index;
                if(prevr < 0)
                {
                    break;
                }
                if(this.extendCellOrigins[sheetIndex][prevr+"_"+c] || (this.addExtendCellOrigins[sheetIndex] && this.addExtendCellOrigins[sheetIndex][prevr+"_"+c]))
                {
                    originCell = this.extendCellOrigins[sheetIndex][prevr+"_"+c];
                    if(!originCell){
                        originCell = this.addExtendCellOrigins[sheetIndex][prevr+"_"+c];
                    }
                    const extraConfig = this.extraCustomCellConfigs[sheetIndex][originCell.r + "_" + originCell.c];
                    if(extraConfig)
                    {
                        if(extraConfig.cellExtend == 3)
                        {
                            if(!this.addExtendCellOrigins[sheetIndex])
                            {
                                this.addExtendCellOrigins[sheetIndex] = {};
                            }
                            if(!this.addExtendCellOrigins[sheetIndex][r+"_"+c])
                            {
                                this.addExtendCellOrigins[sheetIndex][r+"_"+c] = {
                                    r:originCell.r,
                                    c:originCell.c
                                }
                            }
                            return originCell;
                        }
                    }
                }
            }
            for (let index = 1; index <= 5; index++) {
                let prevc = c - index;
                if(prevc < 0)
                {
                    break;
                }
                if(this.extendCellOrigins[sheetIndex][r+"_"+prevc] || (this.addExtendCellOrigins[sheetIndex] && this.addExtendCellOrigins[sheetIndex][r+"_"+prevc]))
                {
                    originCell = this.extendCellOrigins[sheetIndex][r+"_"+prevc];
                    if(!originCell){
                        originCell = this.addExtendCellOrigins[sheetIndex][r+"_"+prevc];
                    }
                    const extraConfig = this.extraCustomCellConfigs[sheetIndex][originCell.r + "_" + originCell.c];
                    if(extraConfig)
                    {
                        if(extraConfig.cellExtend == 2)
                        {
                            if(!this.addExtendCellOrigins[sheetIndex])
                            {
                                this.addExtendCellOrigins[sheetIndex] = {};
                            }
                            if(!this.addExtendCellOrigins[sheetIndex][r+"_"+c])
                            {
                                this.addExtendCellOrigins[sheetIndex][r+"_"+c] = {
                                    r:originCell.r,
                                    c:originCell.c
                                }
                            }
                            return originCell;
                        }
                    }
                }
            }
        },
        getCellDatas(luckysheetfile){
            var result = [];
            var data = luckysheet.transToCellData(luckysheetfile.data);
            if(data && data.length>0)
            {
                for (let index = 0; index < data.length; index++) {
                    const element = data[index];
                    // if(element.v && element.v.mc && !element.v.v)
                    // {
                    //     if(element.v.ct && element.v.ct.t == "inlineStr")
                    //     {
                    //         result.push(element);
                    //     }
                    // }else{
                    //     result.push(element);
                    // }
                    result.push(element);
                }
            }
            return result;
        },
        //填报数据校验
        dataVerify(r,c,originR,originC,v,sheetIndex,wrongMsg,rowFlag,cellExtend){
            const key = r + "_" + c;
            const originKey = originR + "_" + originC;
            if(this.extraCustomCellConfigs[sheetIndex])
            {
                const cellConfig = this.extraCustomCellConfigs[sheetIndex][originKey];
                if(cellConfig)
                {
                    if(cellConfig.require)
                    {//校验必填项
                        if(!v || v == '')
                        {
                            wrongMsg.push("内容不能为空。");
                        }else{
                            if(cellConfig.valueType == '1')
                            {
                                this.textValid(cellConfig,v,wrongMsg,key);
                            }else if(cellConfig.valueType == '2')
                            {
                                this.numberValid(cellConfig,v,wrongMsg,key);
                            } 
                        }
                    }else{
                        if(cellConfig.valueType == '1')
                        {
                            this.textValid(cellConfig,v,wrongMsg,key);
                        }else if(cellConfig.valueType == '2')
                        {
                            this.numberValid(cellConfig,v,wrongMsg,key);
                        }
                    }
                    if(cellConfig.otherCellCompare && cellConfig.compareCells != null && cellConfig.compareCells.length > 0)
                    {//与其他单元格比较
                        for (let index = 0; index < cellConfig.compareCells.length; index++) {
                            const element = cellConfig.compareCells[index];
                            this.compareOtherCells(wrongMsg,element,v,cellConfig.valueType,cellConfig.dateFormat,rowFlag,cellExtend);
                        }
                    }
                }
            }
        },
         //wrongMsg 错误信息
        //compareCell 对比目标单元格信息
        //r 单元格横坐标
        //c 单元格纵坐标
        //valueType:值类型 1文本 2数值 3日期 3下拉选项单选
        compareOtherCells(wrongMsg,compareCell,v,valueType,dateFormat,rowFlag,cellExtend){
            var cellType = compareCell.cellType;
            if(cellType == 1)
            {//固定单元格对比
                this.compareFixedCell(wrongMsg,compareCell,v,valueType,dateFormat);
            }else{//同行/列扩展单元格对比
                this.compareExtendCell(wrongMsg,compareCell,v,valueType,dateFormat,rowFlag,cellExtend)
            }
        },
        compareFixedCell(wrongMsg,compareCell,v,valueType,dateFormat){
            var sheetName = compareCell.sheetName;
            var coordinate = compareCell.coordinate;
            var compareType = compareCell.compareType;;
            var luckysheetFile = luckysheet.getSheet({name:sheetName});
            var sheetOrder = luckysheetFile.order;
            const coords = this.commonUtil.getCoordsFromColumnName(coordinate,false);
            var compareR = coords.split("_")[0];
            var compareC = coords.split("_")[1];
            var cellValue = luckysheet.getCellValue(compareR,compareC,{type:"v",order:sheetOrder});
            this.cellValueCompare(wrongMsg,v,cellValue,compareType,valueType,coordinate,dateFormat,sheetName);
        },
        compareExtendCell(wrongMsg,compareCell,v,valueType,dateFormat,rowFlag,cellExtend){
            var sheetName = compareCell.sheetName;
            var coordinate = compareCell.coordinate;
            var compareType = compareCell.compareType;;
            var luckysheetFile = luckysheet.getSheet({name:sheetName});
            var sheetOrder = luckysheetFile.order;
            const coords = this.commonUtil.getCoordsFromColumnName(coordinate,false);
            var compareR = Number(coords.split("_")[0]);
            var compareC = Number(coords.split("_")[1]);
            if(cellExtend == 2)
            {
                compareC = compareC + rowFlag;
            }else if(cellExtend == 3){
                compareR = compareR + rowFlag;
            }
            var cellValue = luckysheet.getCellValue(compareR,compareC,{type:"v",order:sheetOrder});
            coordinate = this.commonUtil.getColumnFromCoords(compareR,compareC);
            this.cellValueCompare(wrongMsg,v,cellValue,compareType,valueType,coordinate,dateFormat,sheetName);
        },
        cellValueCompare(wrongMsg,v,compareV,compareType,valueType,compareCellCoords,dateFormat,sheetName){
            if(v == null || v == "" || compareV == null || compareV == "")
            {
                return;
            }
            switch (compareType) {
                case this.commonConstants.operator.EQ://相等
                    if((v+'') != (compareV+''))
                    {
                        wrongMsg.push("请输入与单元格"+sheetName+"!"+compareCellCoords+"相等的值。"); 
                    }
                    break;
                case this.commonConstants.operator.NE://不相等
                    if((v+'') == (compareV+''))
                    {
                        wrongMsg.push("请输入与单元格"+sheetName+"!"+compareCellCoords+"不相等的值。"); 
                    }
                    break;
                case this.commonConstants.operator.GT://大于
                    if(valueType == '2')
                    {//数值
                        if(this.commonUtil.isRealNum(v) && this.commonUtil.isRealNum(compareV))
                        {
                            v = Number(v);
                            compareV = Number(compareV);
                            if(v <= compareV)
                            {
                                wrongMsg.push("请输入大于单元格"+sheetName+"!"+compareCellCoords+"的值。"); 
                            }
                        }
                    }else if(valueType == '3')
                    {//日期时间
                       var diff = this.commonUtil.compareDate(v,compareV,dateFormat);
                       if(diff >= 0)
                       {
                            wrongMsg.push("请输入大于单元格"+sheetName+"!"+compareCellCoords+"的日期时间。"); 
                       }
                    }
                    break;
                case this.commonConstants.operator.GE://大于等于
                    if(valueType == '2')
                    {//数值
                        if(this.commonUtil.isRealNum(v) && this.commonUtil.isRealNum(compareV))
                        {
                            v = Number(v);
                            compareV = Number(compareV);
                            if(v < compareV)
                            {
                                wrongMsg.push("请输入大于等于单元格"+sheetName+"!"+compareCellCoords+"的值。"); 
                            }
                        }
                    }else if(valueType == '3')
                    {//日期时间
                       var diff = this.commonUtil.compareDate(v,compareV,dateFormat);
                       if(diff > 0)
                       {
                            wrongMsg.push("请输入大于等于单元格"+sheetName+"!"+compareCellCoords+"的日期时间。"); 
                       }
                    }
                    break;
                case this.commonConstants.operator.LT://小于
                    if(valueType == '2')
                    {//数值
                        if(this.commonUtil.isRealNum(v) && this.commonUtil.isRealNum(compareV))
                        {
                            v = Number(v);
                            compareV = Number(compareV);
                            if(v >= compareV)
                            {
                                wrongMsg.push("请输入小于单元格"+sheetName+"!"+compareCellCoords+"的值。"); 
                            }
                        }
                    }else if(valueType == '3')
                    {//日期时间
                       var diff = this.commonUtil.compareDate(v,compareV,dateFormat);
                       if(diff <= 0)
                       {
                            wrongMsg.push("请输入小于单元格"+sheetName+"!"+compareCellCoords+"的日期时间。"); 
                       }
                    }
                    break;
                case this.commonConstants.operator.LE://小于等于
                    if(valueType == '2')
                    {//数值
                        if(this.commonUtil.isRealNum(v) && this.commonUtil.isRealNum(compareV))
                        {
                            v = Number(v);
                            compareV = Number(compareV);
                            if(v > compareV)
                            {
                                wrongMsg.push("请输入小于等于单元格"+sheetName+"!"+compareCellCoords+"的值。"); 
                            }
                        }
                    }else if(valueType == '3')
                    {//日期时间
                       var diff = this.commonUtil.compareDate(v,compareV,dateFormat);
                       if(diff < 0)
                       {
                            wrongMsg.push("请输入小于等于单元格"+sheetName+"!"+compareCellCoords+"的日期时间。"); 
                       }
                    }
                    break;
                case this.commonConstants.operator.IN://包含
                    if(compareV.indexOf(v) < 0)
                    {
                        wrongMsg.push("请输入单元格"+sheetName+"!"+compareCellCoords+"中包含的内容。"); 
                    }
                    break;
                case this.commonConstants.operator.NOTIN://不包含
                    if(compareV.indexOf(v) >= 0)
                    {
                        wrongMsg.push("请不要输入单元格"+sheetName+"!"+compareCellCoords+"中包含的内容。"); 
                    }
                    break;
                default:
                    break;
            }
        },
        //文本类型数据校验
        textValid(cellConfig,v,wrongMsg,key){
            if (cellConfig.lengthValid)
            {
                const length = v?v.length:0;
                if (cellConfig.minLength && this.commonUtil.isNaN(cellConfig.minLength))
                {
                    const minLength = parseInt(cellConfig.minLength);
                    if(length < minLength)
                    {
                        wrongMsg.push("内容输入长度不能小于"+minLength+"。");
                    }
                }
                if (cellConfig.maxLength && this.commonUtil.isNaN(cellConfig.maxLength))
                {
                    const maxLength = parseInt(cellConfig.maxLength);
                    if(length > maxLength)
                    {
                        wrongMsg.push("内容输入长度不能大于"+maxLength+"。");
                    }
                }
                if (cellConfig.textValidRule)
                {
                    switch (cellConfig.textValidRule) {
                        case '1':
                            var regex = eval('/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/');
                            var flag = this.commonUtil.regexValid(v,regex);
                            if(!flag)
                            {
                                wrongMsg.push("请输入正确的邮箱格式数据。");
                            }
                            break;
                        case '2':
                            var regex = eval('/^(1[0-9])\d{9}$/');
                            var flag = this.commonUtil.regexValid(v,regex);
                            wrongMsg.push("请输入正确的手机号码。");
                            break;
                        case '3':
                            var regex = eval('/^(0[0-9]{2,3}-)?([2-9][0-9]{6,7})$/');
                            var flag = this.commonUtil.regexValid(v,regex);
                            if(!flag)
                            {
                                wrongMsg.push("请输入正确的座机号码。");
                            }
                            break;
                        case '4':
                            var regex = eval('/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/');
                            var flag = this.commonUtil.regexValid(v,regex);
                            if(!flag)
                            {
                                wrongMsg.push("请输入正确的身份证号码。");
                            }
                            break;
                        case '99':
                            if (cellConfig.regex) {
                                let regex = eval(cellConfig.regex);
                                var flag = this.commonUtil.regexValid(v,regex);
                                if(!flag)
                                {
                                    wrongMsg.push("请输入正确的数据格式。");
                                }
                                break;
                            }else{
                                break;
                            }
                        default:
                            break;
                    }
                }
            }
        },
        //数字类型校验
        numberValid(cellConfig,v,wrongMsg,key){
            if(!this.commonUtil.isNaN(v))
            {
                wrongMsg.push("请输入数字格式的数据。");
            }else{
                const value = parseFloat(v);
                if(cellConfig.digit && this.commonUtil.isNaN(parseFloat(cellConfig.digit)))
                {
                    var float = parseInt(cellConfig.digit);
                    if(float >0){
                        var regex = eval('/^-?\\d+(\\.\\d{1,'+float+'})?$/');
                        var flag = this.commonUtil.regexValid(v,regex);
                        if(!flag)
                        {
                            wrongMsg.push("小数点后请保留"+float+"位以内。");
                        } 
                    }else{
                        var regex = eval("/^-?\\d+$/");
                        var flag = this.commonUtil.regexValid(v,regex);
                        if(!flag)
                        {
                            wrongMsg.push("请输整数格式的数据。");
                        }
                    }
                }
                if(cellConfig.numberRangeValid)
                {
                    if(cellConfig.minValue && this.commonUtil.isNaN(cellConfig.minValue))
                    {
                        const min = parseFloat(cellConfig.minValue);
                        if(value < min)
                        {
                            wrongMsg.push("请输入大于等于"+min+"的值。");
                        }
                    }
                    if(cellConfig.maxValue && this.commonUtil.isNaN(cellConfig.maxValue))
                    {
                        const max = parseFloat(cellConfig.maxValue);
                        if(value > max)
                        {
                            wrongMsg.push("请输入小于等于"+max+"的值。");
                        }
                    }
                }
            }
        },
        translateCellDataToMap(sheetIndex){
            var result = {};
            var luckysheetfile = luckysheet.getSheet({index:sheetIndex});
            var data = luckysheet.transToCellData(luckysheetfile.data);
            if(data && data.length > 0)
            {
                for (let index = 0; index < data.length; index++) {
                    var element = data[index];
                    result[element.r+"_"+element.c] = element;
                }
            }
            return result;
        },
        //记录初始化时的原始数据
        recordBasicData(cellDatas,sheetIndex,replacedData){
            if(cellDatas && cellDatas.length > 0)
            {
                for (let index = 0; index < cellDatas.length; index++) {
                    const element = cellDatas[index];
                    if(!this.basicData[sheetIndex])
                    {
                        this.basicData[sheetIndex] = {};
                    }
                    if(element.v.v)
                    {
                        if(replacedData && replacedData[element.r+"_"+element.c])
                        {
                            this.basicData[sheetIndex][element.r+"_"+element.c] = replacedData[element.r+"_"+element.c].v.v;
                        }else{
                            this.basicData[sheetIndex][element.r+"_"+element.c] = element.v.v;
                        }
                    }else{
                        this.basicData[sheetIndex][element.r+"_"+element.c] = null;
                    }
                }
            }
        },
        searchtablelist(){
            let sheetIndex = luckysheet.getSheet().index;
            let tplId = this.$route.query.tplId;
            var obj = {
                url:this.apis.luckysheetReportFormsHis.listApi,
                params:Object.assign({sheetIndex:sheetIndex,tplId:tplId}, this.tablePage),
              }
            let headers = {};
            if(this.isShare == 1)
            {
                headers.shareCode = this.shareCode;
                headers.shareUser = this.shareUser;
                obj.url = this.apis.luckysheetReportFormsHis.shareListApi
            }
              this.commonUtil.getTableList(obj,headers).then(response=>{
                this.commonUtil.tableAssignment(response,this.tablePage,this.tableData);
              });
        },
        closeReportHisDialog(){
            this.reportHisDialog = false;
            this.tablePage.currentPage = 1;
            this.tablePage.pageSize = 10;
            this.tablePage.pageTotal = 0;
            this.tableData = [];
        },
        getSubmitHis(){
            this.reportHisDialog = true;
            this.searchtablelist();
        },
        uploadPic(evt){
            const files = evt.target.files
            if (files == null || files.length == 0) {
              alert('请选择文件')
              return
            }
            const formData = new FormData();
            formData.append("file",files[0]);
            let config = {
                headers: {'Content-Type': 'multipart/form-data',
                'Authorization':localStorage.getItem(this.commonConstants.sessionItem.authorization),
                shareCode:this.shareCode,
                shareUser:this.shareUser}
            }
            var that = this;
            Axios.post(this.isShare == 1?this.apis.screenDesign.shareUploadFileApi:this.apis.screenDesign.uploadFileApi, formData, config)
                .then(res => {
                    var data = res.data.responseData;
                    var img = new Image();
                    img.src = data.fileUri;
                    if(that.clickCellPosition)
                    {
                        var r = that.clickCellPosition.r;
                        var c = that.clickCellPosition.c;
                        var extraHeight = 20;
                        var extraWidth = 45;
                        if(!that.showRowHeader)
                        {
                            extraHeight = 0;
                        }
                        if(!that.showColHeader)
                        {
                            extraWidth = 0;
                        }
                        var height = that.clickCellPosition.end_r - that.clickCellPosition.start_r;
                        var width = that.clickCellPosition.end_c - that.clickCellPosition.start_c;
                        luckysheet.setCellValue(r, c, data.fileUri,{isRefresh:false})
                        img.onload = () => {
                            that.ctx.drawImage(img, that.clickCellPosition.start_c + extraWidth, that.clickCellPosition.start_r+extraHeight,width,height);        
                        };
                    }
                })
          },
        userChanged(data){
            this.users = data.v
            if(this.users && this.users.length > 15)
            {
                this.headerUsers = this.users.slice(0,15)
            }else{
                this.headerUsers = this.users;
            }
        }, 
        showSearchClick(){
            this.showSearch = true;
        },
        showSql(){
            this.reportDialogVisiable = true;
        },
        loadDataAfter(){
            var that = this;
            setTimeout(function(){
                that.updateNowFunction();
                // that.updateCellFormat();
            },100);
        },
        uploadAttachment(){
          let rangeAxis = luckysheet.getRangeAxis();
          if(!rangeAxis || rangeAxis.length == 0)
          {
            this.commonUtil.showMessage({ message: '请先选择单元格。', type: this.commonConstants.messageType.error })
            return;
          }
          $("#uploadAttachmentBtn").click() //触发父容器中的保存模板按钮事件
        },
        viewAttachment(item,r,c){
          let fileType = this.commonUtil.getFileExt(item.linkAddress);
          if(fileType){
            if(this.commonConstants.attachPreviewExt.includes(fileType)){
              let viewReport = this.$router.resolve({ name:"attachment",query: {url:item.linkAddress,name:item.fileName,fileType:fileType}});
              window.open(viewReport.href, '_blank');
            }else{
              window.open(item.linkAddress, '_blank');
            }
          }else{
            window.open(item.linkAddress, '_blank');
          }
        },
        changeAttachment(evt){
          this.loading = true;
          let obj = {
            url:this.apis.common.uploadFileApi,
            callback:this.doPostCallback
          }
          const files = evt.target.files
          if (files == null || files.length == 0) {
            alert('请选择文件')
            return
          }
          // 获取文件名
          this.commonUtil.uploadFile(files[0],obj).then(response=>{
            if (response.code == "200")
            {
              let range = luckysheet.getRange()[0];
              let r = range.row[0];
              let c = range.column[0];
              let luckysheetfile = luckysheet.getSheet();
              let cell = luckysheetfile.data[r][c];
              if(cell == null){
                  cell = {};
              }
              cell.fc = 'rgb(0, 0, 255)';
              cell.un = 1;
              cell.v = cell.m = "附件:"+response.responseData.fileName;
              let item = {
                  linkType: "attachment",
                  linkAddress: response.responseData.fileUri,
                  linkTooltip: "",
                  fileName:response.responseData.fileName
              }
              if(luckysheetfile.hyperlink == null){
                luckysheetfile.hyperlink = {};
              }
              luckysheetfile.hyperlink[r + "_" + c] = item;
              const sheetIndex = luckysheet.getSheet().index;
              luckysheet.sendServerMsg("all", sheetIndex,luckysheetfile.hyperlink,{ "k": "hyperlink"},"上传附件："+response.responseData.fileName+"，附件地址："+response.responseData.fileUri);
              luckysheetfile.data[r][c] = cell;
              luckysheet.refresh({},"上传附件："+response.responseData.fileName+"，附件地址："+response.responseData.fileUri);
            }
          });;
          evt.target.value = ''
        },
        doPostCallback(){
          this.loading = false;
        },
    }
}
