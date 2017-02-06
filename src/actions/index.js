/* Plugins actions */
export const LOAD_PLUGINS_REQUESTED = "LOAD_PLUGINS_REQUESTED";
export const LOAD_PLUGINS_SUCCEEDED = "LOAD_PLUGINS_SUCCEEDED";
export const LOAD_PLUGINS_FAILED = "LOAD_PLUGINS_FAILED";
export const loadPlugins = () => ({ type: LOAD_PLUGINS_REQUESTED });

export const LOAD_DASHBOARD_PLUGINS_REQUESTED = "LOAD_DASHBOARD_PLUGINS_REQUESTED";
export const loadDashboardPlugins = (name) => ({ type: LOAD_DASHBOARD_PLUGINS_REQUESTED, name });

export const LOAD_PLUGIN_SERVER_DATA_REQUESTED = 'LOAD_PLUGIN_SERVER_DATA_REQUESTED';
export const LOAD_PLUGIN_SERVER_DATA_SUCCEDED = 'LOAD_PLUGIN_SERVER_DATA_SUCCEDED';
export const LOAD_PLUGIN_SERVER_DATA_FAILED = 'LOAD_PLUGIN_SERVER_DATA_FAILED';

export const LOAD_PLUGIN_DATA = 'LOAD_PLUGIN_DATA';
export const loadPluginsData = (pluginConfig) => ({ type: LOAD_PLUGIN_DATA, pluginConfig });

export const LOAD_PLUGIN_DATA_SUCCEDED = 'LOAD_PLUGIN_DATA_SUCCEDED';
export const loadPluginsDataSucceded = (pluginConfig) => ({ type: LOAD_PLUGIN_DATA_SUCCEDED, pluginConfig });

export const ADD_PLUGIN = 'ADD_PLUGIN';
export const addPlugin = (plugin) => ({ type: ADD_PLUGIN, plugin });
export const RESET_PLUGINS = 'RESET_PLUGINS';
export const resetPlugins = () => ({ type: RESET_PLUGINS });

/* Dashboard actions */
export const RESET_DASHBOARD_DATES = 'RESET_DASHBOARD_DATES';
export const resetDashboardDates = () => ({ type: RESET_DASHBOARD_DATES });

export const UPDATE_DASHBOARD_REQUESTED = 'UPDATE_DASHBOARD_REQUESTED';
export const UPDATE_DASHBOARD_SUCCEDED = 'UPDATE_DASHBOARD_SUCCEDED';
export const UPDATE_DASHBOARD_FAILED = 'UPDATE_DASHBOARD_SUCCEDED_FAILED';
export const updateDashboard = (dashboard) => ({ type: UPDATE_DASHBOARD_REQUESTED, dashboard });

export const LOAD_DASHBOARD = 'LOAD_DASHBOARD';
export const loadDashboard = (name) => ({ type: LOAD_DASHBOARD, name });

export const ADD_DASHBOARD_PLUGIN = 'ADD_DASHBOARD_PLUGIN';
export const addDashboardPlugin = (data) => ({ type: ADD_DASHBOARD_PLUGIN, data });

export const RENDER_DASHBOARD_PLUGIN = 'RENDER_DASHBOARD_PLUGIN';
export const renderDashboardPlugin = (data) => ({ type: RENDER_DASHBOARD_PLUGIN, data });

export const UPDATE_DASHBOARD_PLUGIN = 'UPDATE_DASHBOARD_PLUGIN';
export const updateDashboardPlugin = (data) => ({ type: UPDATE_DASHBOARD_PLUGIN, data });

export const REMOVE_DASHBOARD_PLUGIN = 'REMOVE_DASHBOARD_PLUGIN';
export const removeDashboardPlugin = (data) => ({ type: REMOVE_DASHBOARD_PLUGIN, data });

export const SAVE_DASHBOARD_PLUGIN = 'SAVE_DASHBOARD_PLUGIN';
export const saveDashboardPlugin = (data) => ({ type: SAVE_DASHBOARD_PLUGIN, data });

export const GET_DASHBOARD_PLUGINS_LIST = 'GET_DASHBOARD_PLUGINS_LIST';
export const getDashboardPluginsList = (dashboard) => ({ type: GET_DASHBOARD_PLUGINS_LIST, dashboard });

export const SET_DASHBOARD_LAYOUTS = 'SET_DASHBOARD_LAYOUTS';
export const setDashboardLayouts = (dashboardData) => ({ type: SET_DASHBOARD_LAYOUTS, dashboardData });

/* Modals */
export const GET_DASHBOARD_MODAL = 'GET_DASHBOARD_MODAL';
export const getDashboardModal = (data) => ({ type: GET_DASHBOARD_MODAL, data });

export const OPEN_DASHBOARD_MODAL = 'OPEN_DASHBOARD_MODAL';
export const openDashboardModal = (params) => ({ type: OPEN_DASHBOARD_MODAL, params });

export const CLOSE_DASHBOARD_MODAL = 'CLOSE_DASHBOARD_MODAL';
export const closeDashboardModal = (params) => ({ type: CLOSE_DASHBOARD_MODAL, params });

export const ADD_PLUGIN_IN_DASHBOARD = 'ADD_PLUGIN_IN_DASHBOARD';
export const addPluginInDashboard = (action) => ({ type: ADD_PLUGIN_IN_DASHBOARD, action });

export const REMOVE_PLUGIN_IN_DASHBOARD = 'REMOVE_PLUGIN_IN_DASHBOARD';
export const removePluginInDashboard = (action) => ({ type: REMOVE_PLUGIN_IN_DASHBOARD, action });
