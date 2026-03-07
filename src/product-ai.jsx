import React from 'react';
import { useState, useRef, useEffect, useMemo } from "react";

const PRODUCTS = [
["A-1A1","GY-68 BMP180 BOSCH温度模块 气压传感器"],["A-1A2","RC吸收回路模块 继电器触点保护"],["A-1A3","STM32F030F4P6核心板 开发板 CORTEX-M0"],["A-1A4","XL6019 DC-DC可调升压电源模块 5A"],["A-1A5","5A DC-DC mini560直流降压稳压 3.3V"],["A-1A6","XH-M802 无源调音板前级板高低音调节"],["A-1A7","CP2102 USB转串口线 ttl模块 转232"],["A-1A8","PL2303HXD USB转TTL/RS232 6Pin"],["A-1A9","5A DC-DC mini560直流降压稳压 5V"],["A-1A10","OPT101模拟光照传感器 光强度模块"],["A-1A11","5A DC-DC mini560直流降压稳压 9V"],["A-1A12","5A 恒流恒压 LED驱动 锂离子充电模块"],["A-1A13","GY-BMP280-3.3 高精度大气压强传感器"],["A-1A14","5A DC-DC mini560直流降压稳压 12V"],["A-1A15","DC-DC 高压升压模块 ZVS 电容充电 电磁炮"],["A-1A16","停电自动切换备用蓄电池模块 YX850"],["A-1A17","20W XL6009 DC-DC可调电源 升降压模块"],["A-1A18","无线收发模块套板433M超再生高频接收"],["A-1A19","DC0-100V 100A LED双显数字电流电压表"],["A-1A20","杜邦线 转测试勾 逻辑分析仪 测试钩"],["A-1A21","锂电池主动均衡板 2-8串电感式 4串"],["A-1A22","340G NODEMCU ESP8266 32M物联网模块"],["A-1A23","全协议手机快充模块 QC4.0 PD3.0 3516"],["A-1A24","10K旋转电位器 模拟旋钮电位器模块"],["A-1A25","全协议手机快充模块 QC4.0 PD3.0 3518"],
["A-2A1","5A过流保护传感器模块 交流电流检测"],["A-2A2","2A SX1308 DC-DC可调升压模块"],["A-2A3","12V单键双稳态继电器模块 一键启停 24V"],["A-2A4","LM2576HV DC-DC降压模块 5-60V输入"],["A-2A5","LM386放大板200倍增益功放模块单声道"],["A-2A6","12V单键双稳态继电器模块 一键启停 5V"],["A-2A7","GY-521 MPU-6050模块 三轴加速度陀螺仪"],["A-2A8","激光传感器模块 激光管接收模块"],["A-2A9","5128 D类模块数字功放板 VS8871 5W"],["A-2A10","GY-30 数字光强度模块 BH1750FVI"],["A-2A11","TXS0108E 高速全双工8路电平转换模块"],["A-2A12","5S 15A锂离子电池保护板 18.5V 21V"],["A-2A13","5A恒压恒流降压电源模块 带显示 LED驱动"],["A-2A14","双12位双声道LED音乐频谱电平指示灯"],["A-2A15","VL53L1X 激光测距模块 4米测距"],["A-2A16","Pro Micro Atmega32U4 USB开发板 5V/16M"],["A-2A17","锂电池主动均衡板 2-8串电感式 8串"],["A-2A18","XH-M125 唱戏机放大板 XPT8871 6W"],["A-2A19","GY-291 ADXL345数字三轴重力加速度"],["A-2A20","NE555 频率可调脉冲发生器模块"],["A-2A21","蓝牙5.0解码板立体声蓝牙音频模块 XY-WRBT"],["A-2A22","3D打印机 A4988/DRV8825步进电机驱动扩展板"],["A-2A23","DC Power Shield V1.1.0 for D1 mini"],["A-2A24","3路PWM脉冲频率占空比可调模块"],["A-2A25","3D打印机 42步进电机驱动器扩展板"],
["A-3A1","CP2102 USB转串口模块 USB转TTL 带壳"],["A-3A2","CH340G刷机板模块 USB转TTL STC下载线"],["A-3A3","FT232RL USB转串口模块 USB转TTL"],["A-3A4","1W 3W大功率红外线发射模块 940nm LED"],["A-3A5","双USB输出 9V/12V/24V/36V转5V 3A降压"],["A-3A6","直流电机驱动板 2路 DRV8833 小体积"],["A-3A7","5A量程单相交流有源输出电流互感器"],["A-3A8","USB逻辑分析仪 24M采样 8通道"],["A-3A9","电磁式蜂鸣器 5V 有源蜂鸣器"],["A-3A10","pulsesensor 脉搏心率传感器 生物模拟"],["A-3A11","2A 5V充放电一体模块 3.7V锂电池充电升压"],["A-3A12","心电图机配件 ECG电极片 心电导联贴片"],["A-3A13","数字功放板模块 35W单声道 TDA8932"],["A-3A14","USB转接板 USB公头转母头转microUSB"],["A-3A15","XH-M131 光敏电阻模块 光控继电器 5V"],["A-3A16","5A太阳能充电板 MPPT控制器 防回流"],["A-3A17","DHT11温度湿度模块 传感器 黑板蓝"],["A-3A18","DC-DC 5A降压恒压恒流模块 太阳能 带PWM"],["A-3A19","语音播放模块 MP3播放器 触发播放"],["A-3A20","XH-M131 光敏电阻模块 光控继电器 12V"],["A-3A21","2.54mm-4P测试针 弹簧针 STM32烧写"],["A-3A22","2.54mm-5P烧写针 ARM烧录 下载线 STM32"],["A-3A23","XH-M131 光敏电阻模块 光控继电器 24V"],["A-3A24","MCU-8223 Nrf51822+LIS3DH 蓝牙+加速度模块"],["A-3A25","YX1667型LM386迷你功放板 DC3-12V"],
["A-4A1","1604液晶屏 LCD1604 5V 蓝屏黄绿屏"],["A-4A2","SHT20温湿度传感器模块 I2C通讯"],["A-4A3","8W升压模块 3V-6V转12V 锂电池充电宝"],["A-4A4","带拨动切换开关USB充电电流检测负载测试仪"],["A-4A5","12864液晶屏 带中文字库 ST7920 标准屏"],["A-4A6","TTP229 16路电容式触摸开关数字传感器"],["A-4A7","直流电源模块 DC电源转接板"],["A-4A8","CN3791 MPPT太阳能锂电池充电板 9V"],["A-4A9","5V白字体带背光LCD1602蓝屏 液晶显示屏"],["A-4A10","可调电源模块 1.25V-5V输出 3A CA-1235"],["A-4A11","SPP-C蓝牙转串口适配器 HC-05替换 JDY-31"],["A-4A12","迷你ATTINY85 USB单片机开发板"],["A-4A13","2004 LCD液晶 5V 黄绿屏 20X4"],["A-4A14","精密5V700mA隔离开关电源 AC-DC 220V转5V"],["A-4A15","USB TO TTL/RS485 双功能 FT232芯片"],["A-4A16","3串锂电池电量显示板 12V 五级电量指示"],["A-4A17","VNH2SP30-Monster Moto Shield 步进电机驱动 30A"],["A-4A18","USB风扇调速器风速调节器散热静音迷你"],["A-4A19","简易金属探测器DIY 金属检测仪散件"],["A-4A20","2004 LCD液晶 5V 蓝屏 20X4"],["A-4A21","2.0mm-4P烧写线 STC烧录 顶针 探针"],["A-4A22","3串18650锂电池保护板 带均衡 40A 增强版"],["A-4A23","24V/12V转5V 5A DC-DC降压 超LM2596S"],["A-4A24","5A过流保护传感器模块 交流电流检测 12V"],["A-4A25","热敏电阻温度传感器继电器模块 温控 12V"],
["A-5A1","500MA迷你太阳能锂电池充电板 CN3065"],["A-5A2","WiFi蓝牙ESP32 4MB UNO D1 R32 CH340G"],["A-5A3","3串12.6V电动工具锂电钻保护板"],["A-5A4","CN3791 MPPT太阳能锂电池充电板 6V"],["A-5A5","AS5600编码器 角度模块 12bit高精度磁铁"],["A-5A6","PWM转电压模块 0-100%PWM转0-10V电压"],["A-5A7","数字功放板PAM8403 4*3W四声道 DC5V"],["A-5A8","高电压大功率MOS管触发开关驱动模块 PWM"],["A-5A9","LCD1602字符液晶 LCD Keypad Shield"],["A-5A10","6USB输出DC降压模块12V24V转5V/8A车载"],["A-5A11","数字旋转编码器模块 转动电位器 带旋钮帽"],["A-5A12","TTS中文文字转语音合成 串口控制 带喇叭"],["A-5A13","超薄数字功放板 TPA3110 音箱功率放大"],["A-5A14","LJ12A34Z/BX 接近开关 NPN三线常开"],["A-5A15","线性调压板LM317 最低1.25V 风扇调速"],["A-5A16","TPS61088升压快充电源 3.2V转5V9V12V"],["A-5A17","Mini360航模电源降压模块 DC DC 车载"],["A-5A18","电容触摸调光器 恒压型LED无级调光 PWM"],["A-5A19","USB转接板 公头转母头 micro Type-C 4P"],["A-5A20","ADS1115 16Bit ADC 4通道模数AD转换模块"],["A-5A21","WIFI R3 ATMEGA2560+ESP8266 32MB CH340G"],["A-5A22","433M带编码无线遥控器+带解码4路接收"],["A-5A23","MPPT太阳能控制器 5A DC-DC降压模块"],["A-5A24","TEMT6000 环境光传感器 模拟光照强度"],["A-5A25","MG996R/MG995 舵机 13kg大扭力金属齿轮"],
["A-6A1","高精度5V2A充放电一体模块 Type-C锂电池"],["A-6A2","3串18650锂电池保护板 带均衡 40A 均衡版"],["A-6A3","压力传感器 气压传感器模块 水位传感器"],["A-6A4","Pulsesensor 脉搏心率传感器 带配件"],["A-6A5","18650锂电池 2600mAh 5C 3.7V 动力电芯"],["A-6A6","IIC/I2C 2004 LCD2004液晶屏模块 蓝屏"],["A-6A7","2A 5V充放电一体模块 3.7V锂电池 白色"],["A-6A8","LED液晶电视26-55寸 LED背光升压驱动板"],["A-6A9","30A蓄电池充电控制模块 充满断电 CD63"],["A-6A10","MCP2551 高速CAN通信协议控制器总线模块"],["A-6A11","GY-2561 TSL2561 光强传感器模块"],["A-6A12","蓝牙串口透传模块 HC-06 从机蓝牙模块"],["A-6A13","DC-DC降压电源模块 LM2596升级版 3A可调"],["A-6A14","HC-05主从机一体蓝牙模块 串口透传"],["A-6A15","10-24V重低音炮前级板 低通滤波板"],["A-6A16","LM75温度传感器 高速I2C 高精度 开发板"],["A-6A17","AT24C02模块 I2C IIC EEPROM存储模块"],["A-6A18","SD卡模块 SPI接口 单片机"],["A-6A19","DHT22 单总线数字温湿度传感器2302模块"],["A-6A20","SIM900A模块 短信 GSM GPRS STM32"],["A-6A21","DRV8833电机驱动板模块 代替TB6612FNG"],["A-6A22","NE555脉冲模块 频率占空比可调 方波"],["A-6A23","AD828运放前级放大板 音频放大模块"],["A-6A24","AD Keyboard 模拟键盘模块 电子积木"],["A-6A25","Voltage Sensor 电压检测传感器模块"],
["A-7A1","DC-DC降压电源模块 3A可调 LM2596 24V转5V"],["A-7A2","mini STM32脱机烧写器 离线编程器 SWD"],["A-7A3","六合一多功能串口模块CP2102 485 232互转"],["A-7A4","迷你蓝牙音响数字功放板 USB供电蓝牙接收"],["A-7A5","CH341T USB转I2C IIC UART USB转TTL"],["A-7A6","大功率MOS管触发开关驱动模块 PWM调节"],["A-7A7","5S电池充电保护板BMS 18V21V 20A锂离子"],["A-7A8","GY-MAX4466 electret microphone amplifier"],["A-7A9","7串25.9V七串18650锂电池保护板 15A"],["A-7A10","DHT Pro Shield for D1 mini DHT11温湿度"],["A-7A11","KA2284 电平指示模块 音频电平指示器"],["A-7A12","五线四相步进电机驱动板 ULN2003"],["A-7A13","DC 5V 4相5线步进电机 28YBJ48 减速"],["A-7A14","TTP224 4路电容式触摸开关数字传感器"],["A-7A15","TDA2030A功放模块 音频放大器"],["A-7A16","TP5000充电板 3.6/4.2V锂电池 磷酸铁锂 1A"],["A-7A17","金属探测器diy套件 电子DIY焊接练习板"],["A-7A18","ESP32开发板 WIFI+蓝牙 物联网 ESP-WROOM-32"],["A-7A19","XH-M411 DC-DC数字升压板 5-45V输出 5A"],["A-7A20","AHT10 高精度数字型温湿度传感器 I2C"],["A-7A21","DC-DC大功率升压模块 2~14伏 直流恒压恒流"],["A-7A22","自动升降压电源模块 AT30 降压升压模块"],["A-7A23","DC-DC自动升降压电源模块 恒流降压升压 4A"],["A-7A24","TFT01 3.2'' Mega触摸LCD扩展板 Shield"],["A-7A25","ESP01/01S转接板 面包板适配器 ESP8266"],
["A-8A1","ESP8266 5V WiFi继电器 物联网 手机APP"],["A-8A2","USB转TTL串口小板 FT232RL 3.3V/5V/1.8V"],["A-8A3","12V蓄电池4段电量指示器模块 4位LED"],["A-8A4","TEA5767收音机模块 FM立体声收音机"],["A-8A5","扩展板 NANO IO Shield V1.O简易扩展板"],["A-8A6","GY-302 BH1750 光强度光照度模块"],["A-8A7","PAM8610数字功放板 2x15W双声道 D类"],["A-8A8","经典舵机 SG90 9g舵机 固定翼航模"],["A-8A9","XL7015直流可调降压 DC-DC 5-80V输入"],["A-8A10","ESP8266 ESP-01S WIFI AM2302 DHT22 无线温湿度"],["A-8A11","GY-61 ADXL335模块 角度传感器 倾斜角度"],["A-8A12","四路红外探测寻迹光电传感器 循迹模块"],["A-8A13","5A降压模块 数控电源 DCDC可调降压大功率"],["A-8A14","CN3791 MPPT太阳能锂电池充电板 12V"],["A-8A15","蓝牙继电器 手机蓝牙遥控开关 12V"],["A-8A16","CH341T USB转I2C IIC 带外壳 AT24C02"],["A-8A17","48V可调降压模块 LM2596HVS 4.5-50V"],["A-8A18","LM2596S大功率降压模块 DC-DC可调 带数显"],["A-8A19","DHT11温度模块 单总线数字温湿度传感器"],["A-8A20","微波多普勒雷达探测器传感器 10.525GHz HB100"],["A-8A21","NE555延时模块 12V延时断开继电器 1-10秒 5V"],["A-8A22","声控延时模块 SUNLEPHANT电子积木"],["A-8A23","2Y0A21 GP2Y0A21 红外测距传感器 10-80cm"],["A-8A24","DHT11数字式温湿度传感器 探头"],["A-8A25","MG996R舵机 大扭力金属齿 标准伺服器"],
["A-9A1","铝壳CP2102模块 USB转TTL STC下载器"],["A-9A2","数控升降压模块 恒压恒流 12V升压可调"],["A-9A3","红色HTTM系列电容式触摸开关 2.7V-6V"],["A-9A4","绿色触摸开关模块 电容式 带背光板 3-6V"],["A-9A5","HTTM系列电容式触摸开关 2.7V6V 蓝色"],["A-9A6","语音播放模块 IO触发 串口控制 USB下载"],["A-9A7","5A DCDC可调降压电源模块 XL4005 超LM2596"],["A-9A8","3D打印机 TL-CE振纹消除滤波器"],["A-9A9","8位数码管显示模块 MAX7219 LED 3个IO控制"],["A-9A10","车库门遥控器卷帘门遥控器 433频率 对拷"],["A-9A11","HLK-PM01 超小型电源模块 220v转5v AC-DC"],["A-9A12","步进电机驱动简易控制器 调速正反转 PWM"],["A-9A13","IP6518全协议快充板 QC3.0华为FCP PD"],["A-9A14","ESP8266串口WIFI 工业级稳定版 ESP-12E"],["A-9A15","LM2596S-ADJ DCDC降压 3A可调 带指示灯"],["A-9A16","光敏电阻传感器继电器模块 光控延时 12V"],["A-9A17","电脑来电自动开机 远程智能插座 服务器"],["A-9A18","LED驱动恒流充电 60V降压电源 LM2596HV"],["A-9A19","双色LED模块 5MM KY-011"],["A-9A20","应变片弯曲传感器模块Y3 称重放大模块"],["A-9A21","小度智能音响USB转接电源线 12V圆口车载"],["A-9A22","锂电池组电量指示灯板 单串蓝显"],["A-9A23","锂电池组电量指示灯板 2串蓝显"],["A-9A24","锂电池组电量指示灯板 3串蓝显"],["A-9A25","锂电池组电量指示灯板 4串蓝显"],
["A-10A1","DC0-100V 10A 红蓝LED直流双显数字电流电压表 1A"],["A-10A2","295mm Flexible Shaft Screwdriver Bit"],["A-10A3","SYB-120面包板 实验板 175*46*8.5mm"],["A-10A4","CH340模块 USB转TTL STC12C5A60S2 下载线"],["A-10A5","手持式小型便携锂点焊机 带电池套装"],["A-10A6","蓝屏/黄绿屏LCD 12864B液晶屏 5V IIC 黄绿屏"],["A-10A7","专用适配电源 5V-2A"],["A-10A8","晶体管测试仪 测频仪 PWM LCR表 彩屏 9V电池"],["A-10A9","310PCS 2.54MM杜邦跳线头连接器套件"],["A-10A10","LCD 2004黄绿屏 5V IIC 带转接板"],["A-10A11","T110超薄温度传感器 薄膜热敏电阻 NTC 10K 1M"],["A-10A12","Wade's挤出机hobbed bolt 3D打印机进丝绞轴"],["A-10A13","3串锂电池组电量指示 显示百分比 绿显"],["A-10A14","IIC/I2C 1602液晶模块黄绿屏"],["A-10A15","FT4232H模块 USB转4路RS485 RS232 高速串口"],["A-10A16","360PCS 盒装插簧插片护套 子弹头接线端子"],["A-10A17","USB定时器 USB多功能测试仪 电流电压表 1705"],["A-10A18","微型齿轮泵 微型电机 自吸水泵 RS-360SH"],["A-10A19","USB电流电压检测仪 QC2.0 MX17 黑色"],["A-10A20","USB电流电压检测仪 QC2.0 MX17 蓝色"],["A-10A21","MX18 USB测表仪彩屏 充电器检测仪 白色USB"],["A-10A22","MX18 USB测表仪彩屏 充电器检测仪 黑色USB"],["A-10A23","3D打印机 Endstop 机械限位开关 RAMPS 1.4"],["A-10A24","Type-c测试仪 KWS1802C 1902C白色TYPE-C"],["A-10A25","Type-c测试仪 KWS1802C 1902C黑色TYPE-C"],
["B-1B1","特尖表笔线 铜针1000V 10A万用表笔"],["B-1B2","双模式PWM脉冲个数频率占空比可调发生器 PP1"],["B-1B3","0.96寸 I2C IIC OLED液晶屏模块 蓝色黄蓝白"],["B-1B4","浊度传感器 水混浊度模块 浊度模块"],["B-1B5","电流互感器模块 5A量程 单相交流电流传感器"],["B-1B6","D1迷你版 NodeMcu Lua WIFI ESP8266开发板"],["B-1B7","MAX7219点阵模块控制模块 单片机 显示 送线"],["B-1B8","电脑散热四线PWM风扇温控器自动调速"],["B-1B9","TDA7293单声道功放板 HIFI 100W 双12~32V"],["B-1B10","L9110电机驱动风扇模块 灭火机器人"],["B-1B11","MAX9814麦克风AGC放大器模块 CMA-4544PF"],["B-1B12","高速晶体管测试仪 LCR-T7 全彩屏 成品"],["B-1B13","1路30A带光耦隔离继电器模块 5V 大电流 5V"],["B-1B14","TDA7297功放模块 音频放大器模块"],["B-1B15","电动车电量表 蓄电池锂电池 84V防水红色"],["B-1B16","XY5008数控可调直流稳压电源 50V8A 小盒"],["B-1B17","100W HIFI立体声蓝牙数字功放板 TPA3116 C100H"],["B-1B18","100W HIFI立体声蓝牙数字功放板 TPA3116 AP100H"],["B-1B19","WIFI手机远程控制器模块 5V-36V 智能家居"],["B-1B20","W25Q80大容量FLASH储存模块 SPI 8Mbit"],["B-1B21","12v电容触摸 触摸开关 TTP223模块 继电器"],["B-1B22","AD7606数据采集模块 16位ADC 8路同步 200KHz"],["B-1B23","ESP32-DevKitC开发板 ESP32底板 WROOM-32"],["B-1B24","双头带线鳄鱼夹 测试线 维修连接线 小号"],["B-1B25","MQ-2气体传感器 烟雾甲烷丁烷检测模拟传感器"],
["B-2B1","万用表贴片电容电感表笔 LCR SMD测试镊子"],["B-2B2","大功率PWM调光调速模块 个数频率占空比可调 PP2"],["B-2B3","FT232模块 USB转串口转TTL 升级下载 土豪金"],["B-2B4","电子开关控制板 脉冲触发开关 MOS 场效应管 光耦"],["B-2B5","直流降压模块12V24V转QC3.0快充 单USB 苹果华为"],["B-2B6","直流降压模块12V24V转QC3.0快充 单USB FCP"],["B-2B7","20克FPV舵机云台 fpv航拍摄像头微型 双轴"],["B-2B8","3D打印机 TMC2100步进电机驱动器消纹器滤波器"],["B-2B9","SI5351高频信号方波频率产生器 信号发生器"],["B-2B10","5A USB测试仪彩屏 电压电流功率电量容量快充 UT"],["B-2B11","AD8232心电图监测 脉搏心脏心电图传感器"],["B-2B12","1路继电模块 高电平触发 D1 mini WIFI扩展板 5V"],["B-2B13","单键双稳态一键启停自锁继电器 5V12v24v 24V"],["B-2B14","USB直流降压模块 12V24V转QC3.0手机快充 QCMINI"],["B-2B15","无线蓝牙音频模块 4.2 立体声 无损 HIFI M18"],["B-2B16","无线蓝牙音频模块 4.2 立体声 无损 HIFI M28"],["B-2B17","无线蓝牙音频模块 4.2 立体声 无损 HIFI M38"],["B-2B18","W25Q32大容量FLASH储存模块 SPI BV FV STM32"],["B-2B19","ACS712ELC 5A 电流传感器模块"],["B-2B20","W25Q64 64Mbit 8MByte FLASH储存模块 SPI"],["B-2B21","ACS712ELC 20A 电流传感器模块"],["B-2B22","W25Q128 128Mbit 16MByte大容量FLASH储存模块"],["B-2B23","ACS712ELC 30A 电流传感器模块"],["B-2B24","双头带线鳄鱼夹 测试线 维修连接线 大号"],["B-2B25","MQ-3酒精传感器模块 MQ气体传感器"],
["B-3B1","通用数字万用表笔线 1000V 20A 镀金头"],["B-3B2","LV8729步进电机驱动器 128高细分模块 散热片"],["B-3B3","PLJ-0802-E频率计 频率显示组件 1MHz~1200MH"],["B-3B4","DRV8833电机驱动板 代替TB6612FNG"],["B-3B5","PIC ICD2 PICkit 2/3 编程下载烧写座适配器"],["B-3B6","大功率PWM调光调速模块 带壳 PP2K"],["B-3B7","51单片机遥控器 MP3遥控器 红外线遥控器"],["B-3B8","可调自动升降压模块恒压恒流 数控太阳能 SK80"],["B-3B9","HG7881 HG7881CP 两路电机驱动板模块"],["B-3B10","超级法拉电容保护板 2.5V 焊好均衡平衡板"],["B-3B11","土豪金FT232 USB转TTL串口 FT232R FT232RL"],["B-3B12","DDS函数信号发生器 正弦波三角波方波 DIY"],["B-3B13","汽车电瓶蓄电池电量显示器 12v24v USB快充"],["B-3B14","单个红外探头 红外寻迹循迹模块 避障传感器"],["B-3B15","XH-W1209数显温控器 高精度温度控制器"],["B-3B16","Type-c测试仪 多功能usb检测仪 1802C"],["B-3B17","L7809 LM7809 三端稳压器模块 9V稳压"],["B-3B18","PLJ-8LED-H频率计 0.1MHz~1000MHz 红色"],["B-3B19","ESP32 CAM开发板 带OV2640 WIFI+蓝牙 单独底座"],["B-3B20","Type-c测试仪 多功能usb检测仪 1802C"],["B-3B21","7A/160W双路直流电机驱动模块 PWM调速 L298"],["B-3B22","实时继电器 定时与时钟同步 24H定时 5个时间段"],["B-3B23","SIM800C GSM GPRS模块 5V/3.3V TTL STM32"],["B-3B24","WXD3-13-2W 多圈线绕电位器 22K"],["B-3B25","MQ-4天然气传感器模块 甲烷传感器"],
["B-4B1","5号6节无盖无开关电池盒 带DC插头 9V电池座"],["B-4B2","DC-DC USB可调升降压电源 5V转3.3V-24V DP"],["B-4B3","51 AVR USBasp下载器 USB ISP编程 带外壳"],["B-4B4","DC-DC USB可调升降压电源 5V转3.3V-24V DP"],["B-4B5","1-8S新款二合一电量显示器 BB响低压报警器"],["B-4B6","cr2032 3V纽扣电池 汽车遥控器车钥匙主板"],["B-4B7","升级版 WeMos D1 R2 WiFi UNO ESP8266"],["B-4B8","0.1R-9999999R可编程电阻板 八段式 绿色"],["B-4B9","STC15F2K60S2核心板 最小系统板 51单片机"],["B-4B10","30W/40W立体声蓝牙功放板12V/24V 不带外壳"],["B-4B11","12V延时继电器模块 汽车启动延时 时间可调"],["B-4B12","DDS低频信号发生器 三角波方波正弦波"],["B-4B13","2代B型超声波光敏声音16种传感器套件"],["B-4B14","PWM脉冲频率占空比可调模块 方波 XY-LPWM"],["B-4B15","延时通断外部触发开关 5V12V继电器循环控制"],["B-4B16","DC-DC XL4015/4005可调降压 5~32V 大功率"],["B-4B17","Microbit开发板扩展板 Python编程创客教育 T型"],["B-4B18","单键双稳态一键启停自锁继电器 12V"],["B-4B19","51 AVR 编程器 ISP下载器 USBASP"],["B-4B20","AS608光学指纹传感器 指纹模块"],["B-4B21","MAX7219点阵模块 4合一显示 绿色"],["B-4B22","WXD3-13-2W 多圈线绕电位器 100K"],["B-4B23","Mini SD卡模块 Micro SD卡转接板"],["B-4B24","WXD3-13-2W 多圈线绕电位器 4.7K"],["B-4B25","MQ-5液化气天然气城市煤气传感器模块"],
["B-5B1","160W*2高低音调节蓝牙功放板 TDA7498E 1602T"],["B-5B2","ESP8266扩展板 扩展GPIO Wifi Shield"],["B-5B3","10W/15W/20W双声道立体声蓝牙数字功放板9/12V"],["B-5B4","红板3路寻迹模块 寻线模块 机器人配件"],["B-5B5","4位双显示LED数字电压电流表 DC0-200V 10A"],["B-5B6","XY-TR01温湿度控制模块数显 自动恒温恒湿"],["B-5B7","超声波测距模块 HC-SR04 SR04P SR04+ 单芯片"],["B-5B8","全新原装 L298N电机驱动板模块 步进电机"],["B-5B9","MAX7219点阵模块 控制模块 红/蓝/绿"],["B-5B10","篮板 大按键模块 按钮模块 黄色"],["B-5B11","篮板 大按键模块 按钮模块 绿色"],["B-5B12","SCT-013-000 YHDC 100A开合式电流互感器"],["B-5B13","A902运放模块功放前置板 NE5532音调板前置放大"],["B-5B14","MAX7219点阵模块 8点阵2*4显示屏模块"],["B-5B15","XH-W3005数显字湿度控制器 加湿除湿 12V"],["B-5B16","XH-W3005数显字湿度控制器 加湿除湿 24V"],["B-5B17","XH-W3005数显字湿度控制器 加湿除湿 220V"],["B-5B18","PLJ-8LED-H频率计 0.1MHz~1000MHz 绿色"],["B-5B19","PLJ-8LED-H频率计 0.1MHz~1000MHz 蓝色"],["B-5B20","30W/40W立体声蓝牙功放板12V/24V XY-P40W"],["B-5B21","XK-W2002电子控温插座 温度控制器 数显 欧规"],["B-5B22","多圈电位器 WXD3-13-2W 10K"],["B-5B23","YX5300 MP3 Player模块 语音播放器 串口 TF卡"],["B-5B24","WXD3-13-2W 多圈线绕电位器 1K"],["B-5B25","MQ-6丙烷丁烷液化气传感器模块"],
["C-1C1","ADS1115超小型16位精密模数转换器ADC开发板"],["C-1C2","纯正弦波逆变器驱动板 EGS002 EG8010 IR2110"],["C-1C3","纯正弦波逆变器驱动板 EGS002 EG8010"],["C-1C4","GY-68 BMP180 新款BOSCH温度气压传感器"],["C-1C5","4路快充模块 12V24V转QC3.0快充 苹果华为"],["C-1C6","ENC28J60 SPI接口以太网网络模块 mini版"],["C-1C7","DCDC 630V 24W*2 手机充电头 QC2.0 3.0 带外壳"],["C-1C8","自动升降压电源模块 降压升压 可调电压 稳压"],["C-1C9","IP5328P充电宝双向快充模块 移动电源 3.7V升压"],["C-1C10","LED交通信号灯模块 5V 红绿灯"],["C-1C11","霍尔传感器 霍尔接近开关 NJK-5002C 磁性开关"],["C-1C12","L7812 LM7812 三端稳压器模块 12V稳压"],["C-1C13","CP2102模块 USB转串口 UART STC下载器 9102"],["C-1C14","5A双路直流电机驱动模块 正反转PWM 双H桥 5AD"],["C-1C15","MAX6675热电偶模块 K型热电偶 SIP接口 6675"],["C-1C16","手机应急充电快充 QC3.0苹果华为MTK 降压模块"],["C-1C17","黑色 NRF24L01无线模块 24L01+升级版 黑金刚"],["C-1C18","USB电压电流定时计时功率检测表 快充 1705B"],["C-1C19","2路PWM脉冲频率占空比可调模块 步进电机驱动"],["C-1C20","MPR121电容式触摸传感器控制器 键盘"],["C-1C21","XYH3606数控直流稳压电源恒压恒流 36V6A"],["C-1C22","MEGA2560 Sensor Shield 传感器扩展板"],["C-1C23","ISD1820录音语音模块 录放音 带咪头 送喇叭"],["C-1C24","51 AVR USBASP下载器 USBISP下载线"],["C-1C25","直插按键 4X4矩阵键盘 16按键 单片机外扩键盘"],
["D-1D1","宽电压5V-30V触发延时继电器模块 延时导通"],["D-1D2","NE555延时模块12V延时断开继电器 延时可调"],["D-1D3","无限循环/单次/延时双可调/多功能继电器模块"],["D-1D4","6路继电器模块 继电器扩展板 带光耦保护 5v"],["D-1D5","光敏二极管继电器控制模块 光控开关有光感应 12V"],["D-1D6","STM32F103C8T6最小系统板/核心板/开发板/飞控"],["D-1D7","6路继电器模块 继电器扩展板 带光耦保护 24V"],["D-1D8","Raspberry Pi 2代HAT 洞洞板 DIY B+/A+"],["D-1D9","Screw Shield V2接线柱端子扩展板 双配套"],["D-1D10","4路5V/12V/24V继电器模块 30A高低电平触发"],["D-1D11","流水灯套件 NE555+CD4017 电子DIY散件"],["D-1D12","隔离串口模块 隔离USB转TTL FT232光电隔离"],["D-1D13","tp5000磷酸铁锂电池2A充电板 带散热片"],["D-1D14","一分二莲花头3公对6母 dvd机顶盒音频视频线"],["D-1D15","5V 4路蓝牙继电器 四路蓝牙 物联网 手机APP"],["D-1D16","兼容 Raspberry PI 原型扩展版 Prototyping Pi"],["D-1D17","XH-M139 2.1声道大功率数字功放板 TPA3116D2"],["D-1D18","E18-D80NK光电传感器 漫反射式红外光电开关"],["D-1D19","XH-M145 雅马哈数字功放板 D类音频放大 DC12V"],["D-1D20","PWM直流电机调速器12V 24V 36V 单向调速"],["D-1D21","433MHz无线遥控开关 配套遥控器 433M"],["D-1D22","3D打印机reprap Ramps 1.4 2004LCD控制"],["D-1D23","CCMmini微型PWM直流电机调速器 6V12V24V 3A"],["D-1D24","2390孔面包板 MB-102三块组合 ZY-206"],["D-1D25","离子式烟雾传感器 NAP-07"],
["F-1F1","18650 电池盒 1节2节3节4节 带粗线 串联"],["F-1F2","18650 电池盒 1节2节3节4节 带粗线 串联"],["F-1F3","PWM脉冲频率占空比可调模块 XY-PWM1 不带开关"],["F-1F4","L293D motor control shield 电机驱动扩展板"],["F-1F5","18650 电池盒 1节2节3节4节 带粗线 串联"],["F-1F6","18650 电池盒 1节2节3节4节 带粗线 串联"],["F-1F7","ZVS高频感应加热机 1KW成品 无抽头"],["F-1F8","380PCS 40套汽车摩托车2.8mm 接线端子"],["F-1F9","1000W ZVS高频感应加热机 高频淬火 无抽头"],["F-1F10","K02 JSN-SR04T一体化超声波测距模块 防水型"],["F-1F11","XH-A153锂电池蓝牙功放板双声道 5W+5W"],["F-1F12","树莓派 Raspberry Pi B+ T型GPIO扩展板"],["F-1F13","高频感应加热2500W 高频机 高频淬火 无抽头"],["F-1F14","100W立体声蓝牙数字功放板双声道 AP100L"],["F-1F15","迷你音乐特斯拉线圈 等离子喇叭 科学实验"],["F-1F16","电脑风扇调速器机箱4线 8路PWM风扇集成器"],
["G-1G1","传感器套件 45款/37款传感器套装 带外壳"],["G-1G2","HTC-1 HTC-2高精度室内电子温湿度计"],["G-1G3","1200W大功率DC-DC升压恒压恒流可调车载充电"],["G-1G4","HTC-1 HTC-2高精度室内电子温湿度计"],["G-1G5","1500W 30A DC-DC直流恒压恒流升压模块 新款"],["G-1G6","20/40/60/100MHZ P6100 示波器探头 1:10"],["G-1G7","600W DC-DC升压模块 太阳能笔记本 恒流 绿板"],["G-1G8","1500W 30A DC-DC直流恒压恒流升压模块 老款"],["G-1G9","DC-DC大功率升压模块600W 恒压恒流 蓝板"],["G-1G10","DDS函数信号发生器 FG-100"],["G-1G11","1660孔面包板 实验台 免焊式电路测试版 ZY-204"],["G-1G12","SYB-500面包板 实验板 240*200*8.5mm"],["G-1G13","3220孔无焊面包板 ZY-208 MB-102四块组合板"],["G-1G14","16路继电器模块 5V 带光耦保护带LM2596电源 5V"],["G-1G15","Wuzhi Audio2.1声道蓝牙功放板 超重低音 TB21"],["G-1G16","16路继电器模块 5V/12V 带光耦保护 12V"],
["H-1H1","Uno R3配套传感器扩展板 IO口扩展板"],["H-1H2","2节18650并联电池盒 带插针 一节"],["H-1H3","2节18650并联电池盒 带插针 两节"],["H-1H4","3节18650电池盒 插针 三节"],["H-1H5","2节18650并联电池盒 带插针 四节"],["H-1H6","Raspberry pi 2/3 一转三GPIO扩展板面包板"],["H-1H7","4路5v继电器模块 继电器控制板 SUNLEPHANT"],["H-1H8","五路寻迹模块 寻迹传感器 循迹模块 送例程"],["H-1H9","Raspberry pi 2/3 街机游戏retropi USB手柄"],["H-1H10","5路循迹传感器 五路寻迹传感器 tcrt5000l"],
["J-1J1","AVR ISP Shield烧写Bootloader编程器 UNO R3"],["J-1J2","自动浇花水泵 自动灌溉模块DIY 土壤湿度检测"],["J-1J3","PWM脉冲频率占空比可调模块 XY-PWM1 带开关"],["J-1J4","315/433MHz无线射频遥控发射接收模块 低功耗"],["J-1J5","50W*2 HIFI立体声蓝牙数字功放板 TPA3116 C50H"],["J-1J6","蓝牙5.0带前级高低音调节立体声数字功放板 T50L"],["J-1J7","100W立体声蓝牙数字功放板双声道360度 C100L"],["J-1J8","带外壳PWM脉冲频率占空比可调模块 XY-PWM"],["J-1J9","蓝色5110屏 LCD液晶屏模块 兼容3310 LCD"],
["K-1K1","GY-NEO-6M/7M/8M V2飞控GPS模块 带EEPROM 6M"],["K-1K2","温湿度远程控制器模块 双输出自动恒温恒湿"],["K-1K3","PN5180模块 NFC RFID高频IC卡 ISO15693"],["K-1K4","CH340G USB转串口线 ttl模块 转232 迈克5p"],["K-1K5","贴片元件焊接练习板 SOP8 0805 PCB0603"],["K-1K6","XH-M404直流电源调压降压模块 8A XL4016E1"],["K-1K7","K02一体化超声波测距模块 防水型 单独模块"],["K-1K8","Raspberry Pi 3代B USB摄像头 免驱动"],["K-1K9","LM317电源板调压板 317可调稳压2A 带数码显示"],
["L-1L1","USB升压线 DC TO DC 12V 充电宝5V升 5V"],["L-1L2","XH-W1411白壳数字温控器三显多功能 W88 220V"],["L-1L3","USB升压线 DC TO DC 12V 充电宝5V升 12V"],["L-1L4","AT-09蓝牙4.0 BLE CC2541 HM-10 带按键"],["L-1L5","W3230高精度温度控制器 数显温控器 220V"],["L-1L6","AT-09蓝牙4.0 BLE CC2541 HM-10 不带按键"],["L-1L7","W3230高精度温度控制器 数显温控器 24V"],["L-1L8","XH-W1411白壳数字温控器三显多功能 W88 12V"],["L-1L9","W3230高精度温度控制器 数显温控器 12V"],
["M-1M1","F5 5mm LED发光二极管盒装 500只 5色"],["M-1M2","XY5008数控可调直流稳压电源 50V8A 带WIFI"],["M-1M3","DC数控直流稳压电源外壳套件 带快充PD 铝合金"],["M-1M4","三通道单手遥控器接收机套装 打窝船 差速混控"],["M-1M5","1/4W五色环金属膜电阻包 30种常用阻值 300PCS"],["M-1M6","MK-168 MOS晶体管测试仪 RLC表 ESR表"],["M-1M7","XY5008数控直流稳压电源 50V8A 高配版 带WIFI"],
["N-1N1","MC-38门磁 防盗报警器 窗户磁 有线门磁开关"],["N-1N2","窄体 SOP8转DIP8 IC测试座 烧录座 贴片"],["N-1N3","3D打印机主板大功率热床模块 MOS管大电流"],["N-1N4","镀金 SOP8转DIP8 宽体 烧录座 转换座"],["N-1N5","2.0 HIFI级TPA3116数字功放板 蓝牙4.2"],["N-1N6","台式机ATX电源转接板 取电板 引出接线 成品"],["N-1N7","TPA3116D2 100W单声道功放板 全频单声道"],["N-1N8","锂电源扩展板 双USB输出 Pi3独立外场供电"],["N-1N9","DHT21/AM2301电容式数字温湿度传感器 AM230A"],
["S-1S1","FT4232H USB转4路串口 串口扩展 高速模块"],["S-1S2","KIS3R33S 7V-24V转5V/3A 同步整流 DC-DC降压"],["S-1S3","SHT40模块 数字温湿度传感器 IIC接口 带转接板"],["S-1S4","整流滤波电源板 3A整流功放 AC转DC单电源板"],["S-1S5","ESP32-DevKitC开发板 黑色底板 WROVER"],["S-1S6","LED/LCD液晶模块副电源 5V-24V修复 CA-515"],["S-1S7","红板PAM8403超迷你数字功放板 小功放 3W双声道"],["S-1S8","GY-87 10DOF MPU6050 HMC5883L BMP180"],["S-1S9","5V Micro USB Tiny AVR ISP ATtiny44开发板"],["S-1S10","GY21 SHT21 HTU21D温湿度传感器模块 I2C SHT21"],["S-1S11","SHTC3高精度数字型温湿度传感器 优于DHT22"],["S-1S12","GY-56 VL53L1X激光测距传感器 串口I2C 黄板"],["S-1S13","GY-213V-HDC1080高精度温湿度传感器"],["S-1S14","GY-MAX30100心跳心率脉搏血氧检测传感器 紫色"],["S-1S15","GY-LSM6DS3模块 6轴 IIC/SPI传输"],["S-1S16","GY-MAX30102心跳心率脉搏血氧检测传感器 紫色"],["S-1S17","SDR无线电台保护器 SDR接收保护器"],["S-1S18","VL53L1X激光测距传感器模块 TOF 4米测距"],["S-1S19","GY-MCP3421模块 18bit高精度A/D转换 MCP3421"],["S-1S20","肌电传感器 肌肉信号传感器 EMG Sensor"],["S-1S21","MMA8452模块 数字三轴模块 倾斜度 GY-45"],["S-1S22","3/2/B+ LED全彩点阵屏 8*8点阵矩阵模块"],
];

const CATEGORIES = {
  "传感器": ["温度","湿度","气压","陀螺仪","加速度","光照","激光","距离","心率","血氧","电流","电压","气体","土壤","红外","超声波","雷达","脉搏","霍尔","压力","流量","紫外","颜色","烟雾","触摸"],
  "电源模块": ["降压","升压","升降压","稳压","充电","DC-DC","太阳能","MPPT","锂电池","恒流恒压","快充","QC","AC-DC","逆变","ZVS"],
  "单片机/开发板": ["STM32","Arduino","ESP8266","ESP32","UNO","MEGA","NANO","NodeMCU","ATmega","Raspberry","树莓派","开发板","核心板","最小系统"],
  "通信模块": ["蓝牙","WiFi","433M","NRF24L01","LoRa","GSM","GPRS","SIM","RS485","RS232","TTL","CAN","I2C","IIC","SPI","串口","以太网","NFC","RFID","ZigBee"],
  "显示屏": ["LCD","OLED","LED","液晶屏","显示屏","数码管","TFT","点阵"],
  "音频功放": ["功放","功率放大","音频","蓝牙音箱","解码","喇叭","TPA3116","PAM8403","TDA7","音频放大","前级"],
  "电机驱动": ["步进电机","舵机","直流电机","L298N","DRV8825","A4988","TB6612","PWM调速","电机驱动"],
  "继电器": ["继电器","relay","延时","定时","光耦","固态继电器"],
  "存储/编程器": ["FLASH","EEPROM","存储","编程器","下载器","烧录","SD卡","TF卡","烧写"],
  "测量仪器": ["万用表","示波器","频率计","电流表","电压表","功率表","晶体管测试仪","LCR表","信号发生器"],
  "工具配件": ["面包板","杜邦线","鳄鱼夹","电池盒","散热","接线端子","PCB","洞洞板","保险丝","探针"]
};

function categorize(name) {
  const n = name.toLowerCase();
  for (const [cat, keywords] of Object.entries(CATEGORIES)) {
    if (keywords.some(k => n.includes(k))) return cat;
  }
  return "其他";
}

const CATEGORY_COLORS = {
  "传感器": "#00d4aa",
  "电源模块": "#ff6b35",
  "单片机/开发板": "#4ecdc4",
  "通信模块": "#45b7d1",
  "显示屏": "#f7dc6f",
  "音频功放": "#e74c3c",
  "电机驱动": "#9b59b6",
  "继电器": "#e67e22",
  "存储/编程器": "#1abc9c",
  "测量仪器": "#3498db",
  "工具配件": "#95a5a6",
  "其他": "#bdc3c7"
};

const allProducts = PRODUCTS.map(([id, name]) => ({
  id, name, category: categorize(name)
}));

export default function App() {
  const [query, setQuery] = useState("");
  const [aiQuery, setAiQuery] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [filtered, setFiltered] = useState(allProducts);
  const [selectedCat, setSelectedCat] = useState("全部");
  const [aiResults, setAiResults] = useState(null);
  const [view, setView] = useState("table");
  const inputRef = useRef(null);

  const categories = useMemo(() => {
    const counts = {};
    allProducts.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  useEffect(() => {
    let result = allProducts;
    if (selectedCat !== "全部") result = result.filter(p => p.category === selectedCat);
    if (query) result = result.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase()) || p.id.toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(result);
  }, [query, selectedCat]);

  async function handleAiSearch() {
    if (!aiQuery.trim()) return;
    setLoading(true);
    setAiResponse("");
    setAiResults(null);
    try {
      const productList = allProducts.map(p => `${p.id}: ${p.name}`).join("\n");
      const resp = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `你是一个电子零件库存管理助手。以下是所有产品列表（位置代码: 产品名称）：\n\n${productList}\n\n当用户询问时，请：
1. 找到相关产品并列出它们的位置代码
2. 简要解释你的回答
3. 返回格式：先写分析说明，然后用JSON格式列出匹配的产品位置代码数组，格式：RESULTS_JSON:[...]`,
          messages: [{ role: "user", content: aiQuery }]
        })
      });
      const data = await resp.json();
      const text = data.content?.[0]?.text || "无响应";
      const match = text.match(/RESULTS_JSON:\[([^\]]*)\]/);
      if (match) {
        const ids = JSON.parse(`[${match[1]}]`);
        const matches = allProducts.filter(p => ids.includes(p.id));
        setAiResults(matches);
        setAiResponse(text.replace(/RESULTS_JSON:\[([^\]]*)\]/, "").trim());
      } else {
        setAiResponse(text);
      }
    } catch (e) {
      setAiResponse("查询失败: " + e.message);
    }
    setLoading(false);
  }

  const displayProducts = aiResults || filtered;

  const catData = Object.entries(categories).sort((a, b) => b[1] - a[1]);
  const total = allProducts.length;

  return (
    <div style={{
      fontFamily: "'Courier New', monospace",
      background: "#0a0e1a",
      minHeight: "100vh",
      color: "#c8d6e5",
      padding: "0"
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #0d1b2a 0%, #1a2744 100%)",
        borderBottom: "1px solid #1e3a5f",
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 100
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            background: "linear-gradient(135deg, #00d4aa, #0099ff)",
            borderRadius: "8px",
            padding: "6px 10px",
            fontSize: "18px"
          }}>⚡</div>
          <div>
            <div style={{ fontSize: "16px", fontWeight: "bold", color: "#fff", letterSpacing: "2px" }}>
              AI 智能产品管理系统
            </div>
            <div style={{ fontSize: "11px", color: "#4a9eda", marginTop: "2px" }}>
              INVENTORY INTELLIGENCE TERMINAL · {total} PRODUCTS
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          {["table", "stats"].map(v => (
            <button key={v} onClick={() => setView(v)} style={{
              background: view === v ? "#1e3a5f" : "transparent",
              color: view === v ? "#00d4aa" : "#4a9eda",
              border: `1px solid ${view === v ? "#00d4aa" : "#1e3a5f"}`,
              borderRadius: "6px",
              padding: "6px 14px",
              cursor: "pointer",
              fontSize: "12px",
              letterSpacing: "1px"
            }}>
              {v === "table" ? "📋 目录" : "📊 统计"}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: "20px 24px", maxWidth: "1400px", margin: "0 auto" }}>
        {/* AI Search Bar */}
        <div style={{
          background: "linear-gradient(135deg, #0d1b2a, #112240)",
          border: "1px solid #1e3a5f",
          borderRadius: "12px",
          padding: "20px",
          marginBottom: "20px",
          position: "relative",
          overflow: "hidden"
        }}>
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "2px",
            background: "linear-gradient(90deg, #00d4aa, #0099ff, #9b59b6)"
          }} />
          <div style={{ fontSize: "12px", color: "#4a9eda", marginBottom: "10px", letterSpacing: "2px" }}>
            🤖 AI NATURAL LANGUAGE SEARCH
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              ref={inputRef}
              value={aiQuery}
              onChange={e => setAiQuery(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleAiSearch()}
              placeholder="例如：找所有温度传感器 / 哪里有蓝牙音频模块 / 列出所有继电器产品..."
              style={{
                flex: 1,
                background: "#071020",
                border: "1px solid #1e3a5f",
                borderRadius: "8px",
                padding: "12px 16px",
                color: "#c8d6e5",
                fontSize: "14px",
                outline: "none",
                fontFamily: "inherit"
              }}
            />
            <button onClick={handleAiSearch} disabled={loading} style={{
              background: loading ? "#1e3a5f" : "linear-gradient(135deg, #00d4aa, #0099ff)",
              color: loading ? "#4a9eda" : "#0a0e1a",
              border: "none",
              borderRadius: "8px",
              padding: "12px 24px",
              cursor: loading ? "not-allowed" : "pointer",
              fontWeight: "bold",
              fontSize: "13px",
              letterSpacing: "1px",
              minWidth: "100px"
            }}>
              {loading ? "分析中..." : "AI 查询"}
            </button>
            {aiResults && (
              <button onClick={() => { setAiResults(null); setAiResponse(""); setAiQuery(""); }} style={{
                background: "transparent",
                color: "#e74c3c",
                border: "1px solid #e74c3c",
                borderRadius: "8px",
                padding: "12px 16px",
                cursor: "pointer",
                fontSize: "12px"
              }}>✕ 清除</button>
            )}
          </div>
          {aiResponse && (
            <div style={{
              marginTop: "12px",
              padding: "12px 16px",
              background: "#071020",
              borderRadius: "8px",
              borderLeft: "3px solid #00d4aa",
              fontSize: "13px",
              lineHeight: "1.6",
              color: "#a8c6e0"
            }}>
              {aiResponse}
              {aiResults && <span style={{ color: "#00d4aa", fontWeight: "bold", marginLeft: "8px" }}>
                — 找到 {aiResults.length} 个匹配产品
              </span>}
            </div>
          )}
        </div>

        {view === "stats" ? (
          /* Stats View */
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
              {catData.map(([cat, count]) => (
                <div key={cat} onClick={() => { setSelectedCat(cat); setView("table"); }} style={{
                  background: "#0d1b2a",
                  border: `1px solid ${CATEGORY_COLORS[cat]}33`,
                  borderRadius: "12px",
                  padding: "20px",
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = CATEGORY_COLORS[cat]}
                  onMouseLeave={e => e.currentTarget.style.borderColor = CATEGORY_COLORS[cat] + "33"}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                    <div style={{ fontSize: "14px", color: "#fff", fontWeight: "bold" }}>{cat}</div>
                    <div style={{
                      background: CATEGORY_COLORS[cat] + "22",
                      color: CATEGORY_COLORS[cat],
                      padding: "4px 10px",
                      borderRadius: "20px",
                      fontSize: "13px",
                      fontWeight: "bold"
                    }}>{count}</div>
                  </div>
                  <div style={{
                    height: "6px",
                    background: "#1e2a3a",
                    borderRadius: "3px",
                    overflow: "hidden"
                  }}>
                    <div style={{
                      height: "100%",
                      width: `${(count / total * 100)}%`,
                      background: `linear-gradient(90deg, ${CATEGORY_COLORS[cat]}, ${CATEGORY_COLORS[cat]}88)`,
                      borderRadius: "3px",
                      transition: "width 0.5s ease"
                    }} />
                  </div>
                  <div style={{ fontSize: "11px", color: "#4a9eda", marginTop: "6px" }}>
                    占比 {(count / total * 100).toFixed(1)}% · 点击浏览
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Table View */
          <div style={{ display: "flex", gap: "16px" }}>
            {/* Sidebar */}
            <div style={{
              width: "200px",
              flexShrink: 0,
              background: "#0d1b2a",
              borderRadius: "12px",
              border: "1px solid #1e3a5f",
              padding: "12px",
              alignSelf: "flex-start",
              position: "sticky",
              top: "80px"
            }}>
              <div style={{ fontSize: "11px", color: "#4a9eda", marginBottom: "10px", letterSpacing: "2px" }}>CATEGORIES</div>
              {[["全部", total], ...catData].map(([cat, count]) => (
                <div key={cat} onClick={() => { setSelectedCat(cat); setAiResults(null); }} style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "6px 10px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  background: selectedCat === cat ? "#1e3a5f" : "transparent",
                  marginBottom: "2px",
                  transition: "all 0.15s"
                }}
                  onMouseEnter={e => { if (selectedCat !== cat) e.currentTarget.style.background = "#112240"; }}
                  onMouseLeave={e => { if (selectedCat !== cat) e.currentTarget.style.background = "transparent"; }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    {cat !== "全部" && (
                      <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: CATEGORY_COLORS[cat], flexShrink: 0 }} />
                    )}
                    <span style={{ fontSize: "12px", color: selectedCat === cat ? "#00d4aa" : "#c8d6e5" }}>{cat}</span>
                  </div>
                  <span style={{ fontSize: "11px", color: "#4a9eda" }}>{count}</span>
                </div>
              ))}
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              {/* Search Bar */}
              <div style={{ display: "flex", gap: "10px", marginBottom: "12px" }}>
                <input
                  value={query}
                  onChange={e => { setQuery(e.target.value); setAiResults(null); }}
                  placeholder="关键词搜索产品名称或位置代码..."
                  style={{
                    flex: 1,
                    background: "#0d1b2a",
                    border: "1px solid #1e3a5f",
                    borderRadius: "8px",
                    padding: "10px 16px",
                    color: "#c8d6e5",
                    fontSize: "13px",
                    outline: "none",
                    fontFamily: "inherit"
                  }}
                />
                <div style={{
                  display: "flex", alignItems: "center", padding: "10px 16px",
                  background: "#0d1b2a", border: "1px solid #1e3a5f", borderRadius: "8px",
                  fontSize: "12px", color: "#4a9eda", whiteSpace: "nowrap"
                }}>
                  {aiResults ? `AI: ${displayProducts.length} 结果` : `${displayProducts.length} / ${total}`}
                </div>
              </div>

              {/* Table */}
              <div style={{ background: "#0d1b2a", border: "1px solid #1e3a5f", borderRadius: "12px", overflow: "hidden" }}>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "130px 80px 1fr",
                  background: "#071020",
                  borderBottom: "1px solid #1e3a5f",
                  padding: "10px 16px",
                  fontSize: "11px",
                  color: "#4a9eda",
                  letterSpacing: "2px",
                  fontWeight: "bold"
                }}>
                  <div>位置代码</div>
                  <div>类别</div>
                  <div>产品名称</div>
                </div>
                <div style={{ maxHeight: "600px", overflowY: "auto" }}>
                  {displayProducts.slice(0, 300).map((p, i) => (
                    <div key={p.id} style={{
                      display: "grid",
                      gridTemplateColumns: "80px 130px 80px 1fr",
                      padding: "9px 16px",
                      borderBottom: "1px solid #0f1e30",
                      background: i % 2 === 0 ? "transparent" : "#071218",
                      fontSize: "12px",
                      alignItems: "center",
                      transition: "background 0.1s"
                    }}
                      onMouseEnter={e => e.currentTarget.style.background = "#1e2a3a"}
                      onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? "transparent" : "#071218"}
                    >
                     {/* 产品图片 */}
<img 
  src={`/images/products/${p.id}.png`} 
  alt={p.name}
  style={{ 
    width: '60px', 
    height: '60px', 
    objectFit: 'cover',
    borderRadius: '4px',
    marginRight: '12px',
    border: '1px solid #1e3a5f'
  }}
  onError={(e) => {
    // 图片加载失败时隐藏
    e.target.style.display = 'none';
  }}
/> <div style={{ color: "#00d4aa", fontWeight: "bold", letterSpacing: "1px" }}>{p.id}</div>
                      <div>
                        <span style={{
                          background: CATEGORY_COLORS[p.category] + "22",
                          color: CATEGORY_COLORS[p.category],
                          padding: "2px 6px",
                          borderRadius: "4px",
                          fontSize: "10px",
                          whiteSpace: "nowrap"
                        }}>{p.category === "单片机/开发板" ? "开发板" : p.category === "工具配件" ? "工具" : p.category.length > 4 ? p.category.slice(0, 4) : p.category}</span>
                      </div>
                      <div style={{ color: "#a8c6e0", lineHeight: "1.4" }}>{p.name}</div>
                    </div>
                  ))}
                  {displayProducts.length > 300 && (
                    <div style={{ padding: "16px", textAlign: "center", color: "#4a9eda", fontSize: "12px" }}>
                      仅显示前 300 条 · 共 {displayProducts.length} 条 · 请使用搜索筛选
                    </div>
                  )}
                  {displayProducts.length === 0 && (
                    <div style={{ padding: "48px", textAlign: "center", color: "#4a9eda", fontSize: "13px" }}>
                      未找到匹配产品
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
第一个框（Commit message）：添加产品图片显示
第二个框（Extended description）：可选，可以不填
