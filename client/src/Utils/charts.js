import {
    ModuleRegistry, CartesianChartModule, AreaSeriesModule, BarSeriesModule,
    LineSeriesModule, CategoryAxisModule, NumberAxisModule
} from 'ag-charts-community';

// AG Charts solo incluye en el bundle los módulos registrados: aquí van los que usa la aplicación
ModuleRegistry.registerModules([
    CartesianChartModule,
    AreaSeriesModule,
    BarSeriesModule,
    LineSeriesModule,
    CategoryAxisModule,
    NumberAxisModule
]);

export { AgCharts } from 'ag-charts-react';
