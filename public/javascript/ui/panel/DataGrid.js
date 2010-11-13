
DataGrid = function(url, page, base) {
    this.page = page;
    this.url = url;
    this.base = typeof(base) != 'undefined' ? base : {};

    this.store = new Ext.data.JsonStore({
        root: 'logs',
        autoDestroy: true,
        url: this.url,
        storeId: 'myStore',
        baseParams: this.base,
        autoLoad: {params:{start:0, limit:this.page, sort:"date", dir:"DESC"}},
        idProperty: 'id',
        fields: ['id','type','event','date'],
        totalProperty: 'count',
        remoteSort: true,
        sortInfo: {field: "date", direction: "DESC"}
    });

    this.bbar = new Ext.PagingToolbar({
        pageSize: this.page,
	store: this.store,
        displayInfo: true,
        displayMsg: 'Displaying logs {0} - {1} of {2}',
        emptyMsg: 'No logs to display'
    });
	
    this.columns = [{
			id: 'log-id',
			header: 'Id',
			hidden: true,
			dataIndex: 'id',
			sortable: false
		}, {
			id: 'log-type',
			header: "Type",
			dataIndex: 'type',
			sortable: true,
			width: 60,
			renderer: function(value, metaData, record, rowIndex, colIndex, store) {
				return "<b>" + value + "</b>";
			}
		}, {
			id: 'log-event',
			header: "Event",
			dataIndex: 'event',
			sortable:true,
			width: 420,
			renderer: this.formatTitle
		}, {
			id: 'log-date',
			header: "Date",
			dataIndex: 'date',
			width: 80,
			renderer:  this.formatDate,
			sortable:true
    }];

    DataGrid.superclass.constructor.call(this, {
        region: 'center',
        id: 'topic-grid',
        loadMask: {msg:'Loading Feed...'},

        sm: new Ext.grid.RowSelectionModel({
            singleSelect:true
        }),

        viewConfig: {
            forceFit:true
        }
    });
};

Ext.extend(DataGrid, Ext.grid.GridPanel, {});