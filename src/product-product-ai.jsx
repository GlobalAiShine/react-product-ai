import React, { useState, useRef, useEffect, useMemo } from 'react';

const PRODUCTS = [
  ["A-1A1","GY-68 BMP180 BOSCH温度模块 气压传感器"],["A-1A2","RC吸收回路模块 继电器触点保护"],["A-1A3","STM32F030F4P6核心板 开发板 CORTEX-M0"],["A-1A4","XL6019 DC-DC可调升压电源模块 5A"],
  ["A-2A1","5A过流保护传感器模块 交流电流检测"],["A-2A2","2A SX1308 DC-DC可调升压模块"],["A-2A3","12V单键双稳态继电器模块 一键启停 24V"],["A-2A4","LM2576HV DC-DC降压模块 5-60V输入"],
  ["A-3A1","CP2102 USB转串口模块 USB转TTL 带壳"],["A-3A2","CH340G刷机板模块 USB转TTL STC下载线"],["A-3A3","FT232RL USB转串口模块 USB转TTL"],["A-3A4","1W 3W大功率红外线发射模块 940nm LED"],
  ["A-4A1","1604液晶屏 LCD1604 5V 蓝屏黄绿屏"],["A-4A2","SHT20温湿度传感器模块 I2C通讯"],["A-4A3","8W升压模块 3V-6V转12V 锂电池充电宝"],["A-4A4","带拨动切换开关USB充电电流检测负载测试仪"],
  ["A-5A1","500MA迷你太阳能锂电池充电板 CN3065"],["A-5A2","WiFi蓝牙ESP32 4MB UNO D1 R32 CH340G"],["A-5A3","3串12.6V电动工具锂电钻保护板"],["A-5A4","CN3791 MPPT太阳能锂电池充电板 6V"],
  ["A-6A1","高精度5V2A充放电一体模块 Type-C锂电池"],["A-6A2","3串18650锂电池保护板 带均衡 40A 均衡版"],["A-6A3","压力传感器 气压传感器模块 水位传感器"],["A-6A4","Pulsesensor 脉搏心率传感器 带配件"],
  ["A-7A1","DC-DC降压电源模块 3A可调 LM2596 24V转5V"],["A-7A2","mini STM32脱机烧写器 离线编程器 SWD"],["A-7A3","六合一多功能串口模块CP2102 485 232互转"],["A-7A4","迷你蓝牙音响数字功放板 USB供电"],
  ["A-8A1","ESP8266 5V WiFi继电器 物联网 手机APP"],["A-8A2","USB转TTL串口小板 FT232RL 3.3V/5V/1.8V"],["A-8A3","12V蓄电池4段电量指示器模块 4位LED"],["A-8A4","TEA5767收音机模块 FM立体声收音机"],
  ["A-9A1","铝壳CP2102模块 USB转TTL STC下载器"],["A-9A2","数控升降压模块 恒压恒流 12V升压可调"],["A-9A3","红色HTTM系列电容式触摸开关 2.7V-6V"],["A-9A4","绿色触摸开关模块 电容式 带背光板 3-6V"],
  ["A-10A1","DC0-100V 10A 红蓝LED直流双显数字电流电压表 1A"],["A-10A2","295mm Flexible Shaft Screwdriver Bit"],["A-10A3","SYB-120面包板 实验板 175*46*8.5mm"],["A-10A4","CH340模块 USB转TTL"],
  ["B-1B1","特尖表笔线 铜针1000V 10A万用表笔"],["B-1B2","双模式PWM脉冲个数频率占空比可调发生器 PP1"],["B-1B3","0.96寸 I2C IIC OLED液晶屏模块 蓝色黄蓝白"],["B-1B4","浊度传感器 水混浊度模块 浊度模块"],
  ["B-2B1","万用表贴片电容电感表笔 LCR SMD测试镊子"],["B-2B2","大功率PWM调光调速模块 个数频率占空比可调 PP2"],["B-2B3","FT232模块 USB转串口转TTL 升级下载 土豪金"],["B-2B4","电子开关控制板 脉冲触发"],
  ["B-3B1","通用数字万用表笔线 1000V 20A 镀金头"],["B-3B2","LV8729步进电机驱动器 128高细分模块 散热片"],["B-3B3","PLJ-0802-E频率计 频率显示组件 1MHz~1200MHz"],["B-3B4","DRV8833电机驱动板 代替TB6612"],
  ["B-4B1","5号6节无盖无开关电池盒 带DC插头 9V电池座"],["B-4B2","DC-DC USB可调升降压电源 5V转3.3V-24V DP"],["B-4B3","51 AVR USBasp下载器 USB ISP编程 带外壳"],["B-4B4","DC-DC USB可调升降压电源 5V转3.3V-24V"],
  ["B-5B1","160W*2高低音调节蓝牙功放板 TDA7498E 1602T"],["B-5B2","ESP8266扩展板 扩展GPIO wifi Shield"],["B-5B3","10W/15W/20W双声道立体声蓝牙数字功放板9/12V"],["B-5B4","红板3路寻迹模块 寻线模块"],
  ["C-1C1","ADS1115超小型16位精密模数转换器ADC开发板"],["C-1C2","纯正弦波逆变器驱动板 EGS002 EG8010 IR2110"],["C-1C3","纯正弦波逆变器驱动板 EGS002 EG8010"],["C-1C4","GY-68 BMP180 新款BOSCH温度模块"],
  ["D-1D1","宽电压5V-30V触发延时继电器模块 延时导通"],["D-1D2","NE555延时模块12V延时断开继电器 延时可调"],["D-1D3","无限循环/单次/延时双可调/多功能继电器模块"],["D-1D4","6路继电器模块 继电器扩展板"],
  ["F-1F1","18650 电池盒 1节2节3节4节 带粗线 串联"],["F-1F2","18650 电池盒 1节2节3节4节 带粗线 串联"],["F-1F3","PWM脉冲频率占空比可调模块 XY-PWM1 不带开关"],["F-1F4","L293D motor control shield"],
  ["G-1G1","传感器套件 45款/37款传感器套装 带外壳"],["G-1G2","HTC-1 HTC-2高精度室内电子温湿度计"],["G-1G3","1200W大功率DC-DC升压恒压恒流可调车载充电"],["G-1G4","HTC-1 HTC-2高精度室内电子温湿度计"],
  ["H-1H1","Uno R3配套传感器扩展板 IO口扩展板"],["H-1H2","2节18650并联电池盒 带插针 一节"],["H-1H3","2节18650并联电池盒 带插针 两节"],["H-1H4","3节18650电池盒 插针 三节"],["H-1H5","2节18650并联电池盒"],
  ["J-1J1","AVR ISP Shield烧写Bootloader编程器 UNO R3"],["J-1J2","自动浇花水泵 自动灌溉模块DIY 土壤湿度检测"],["J-1J3","PWM脉冲频率占空比可调模块 XY-PWM1 带开关"],["J-1J4","315/433MHz无线射频遥控模块"],
  ["K-1K1","GY-NEO-6M/7M/8M V2飞控GPS模块 带EEPROM 6M"],["K-1K2","温湿度远程控制器模块 双输出自动恒温恒湿"],["K-1K3","PN5180模块 NFC RFID高频IC卡 ISO15693"],["K-1K4","CH340G USB转串口线 ttl模块"],
  ["L-1L1","USB升压线 DC TO DC 12V 充电宝5V升 5V"],["L-1L2","XH-W1411白壳数字温控器三显多功能 W88 220V"],["L-1L3","USB升压线 DC TO DC 12V 充电宝5V升 12V"],["L-1L4","AT-09蓝牙4.0 BLE CC2541 HM-10"],
  ["M-1M1","F5 5mm LED发光二极管盒装 500只 5色"],["M-1M2","XY5008数控可调直流稳压电源 50V8A 带WIFI"],["M-1M3","DC数控直流稳压电源外壳套件 带快充PD 铝合金"],["M-1M4","三通道单手遥控器接收机套件"],
  ["N-1N1","MC-38门磁 防盗报警器 窗户磁 有线门磁开关"],["N-1N2","窄体 SOP8转DIP8 IC测试座 烧录座 贴片"],["N-1N3","3D打印机主板大功率热床模块 MOS管大电流"],["N-1N4","镀金 SOP8转DIP8 宽体 烧录座"],
  ["S-1S1","FT4232H USB转4路串口 串口扩展 高速模块"],["S-1S2","KIS3R33S 7V-24V转5V/3A 同步整流 DC-DC降压"],["S-1S3","SHT40模块 数字温湿度传感器 IIC接口 带转接板"],["S-1S4","整流滤波电源板"]
];

const CATEGORIES = {
  "A": "传感器模块",
  "B": "电源模块",
  "C": "通信模块",
  "D": "继电器模块",
  "F": "电池模块",
  "G": "套件模块",
  "H": "扩展模块",
  "J": "控制模块",
  "K": "定位模块",
  "L": "转换模块",
  "M": "显示模块",
  "N": "工具模块",
  "S": "其他模块"
};

const ProductDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(([code, name]) => {
      const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           code.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || code.startsWith(selectedCategory);
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const addToCart = (product) => {
    setCart(prev => [...prev, product]);
  };

  const removeFromCart = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const getCategoryName = (code) => {
    const prefix = code.charAt(0);
    return CATEGORIES[prefix] || '其他';
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>电子元器件产品展示</h1>
      
      {/* 搜索和筛选 */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="搜索产品..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px', flex: '1', minWidth: '200px' }}
        />
        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
        >
          <option value="all">所有分类</option>
          {Object.entries(CATEGORIES).map(([key, value]) => (
            <option key={key} value={key}>{value}</option>
          ))}
        </select>
        <button 
          onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          {viewMode === 'grid' ? '列表视图' : '网格视图'}
        </button>
        <button 
          onClick={() => setShowCart(!showCart)}
          style={{ padding: '10px 20px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', position: 'relative' }}
        >
          购物车 ({cart.length})
        </button>
      </div>

      {/* 购物车 */}
      {showCart && (
        <div style={{ marginBottom: '20px', padding: '15px', background: '#f8f9fa', borderRadius: '4px' }}>
          <h3>购物车</h3>
          {cart.length === 0 ? (
            <p>购物车为空</p>
          ) : (
            <div>
              {cart.map((item, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid #ddd' }}>
                  <span>{item[0]} - {item[1]}</span>
                  <button onClick={() => removeFromCart(index)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>删除</button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 产品列表 */}
      <div style={{ 
        display: viewMode === 'grid' ? 'grid' : 'block', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
        gap: '15px' 
      }}>
        {filteredProducts.map(([code, name]) => (
          <div key={code} style={{ 
            padding: '15px', 
            border: '1px solid #ddd', 
            borderRadius: '8px', 
            background: 'white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontWeight: 'bold', color: '#007bff' }}>{code}</span>
              <span style={{ fontSize: '12px', color: '#666', background: '#f0f0f0', padding: '2px 8px', borderRadius: '12px' }}>
                {getCategoryName(code)}
              </span>
            </div>
            <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#333' }}>{name}</p>
            <button 
              onClick={() => addToCart([code, name])}
              style={{ 
                width: '100%', 
                padding: '8px', 
                background: '#28a745', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px', 
                cursor: 'pointer' 
              }}
            >
              加入购物车
            </button>
          </div>
        ))}
      </div>

      {/* 统计信息 */}
      <div style={{ marginTop: '30px', padding: '15px', background: '#f8f9fa', borderRadius: '4px' }}>
        <p>共找到 {filteredProducts.length} 个产品</p>
        <p>购物车中有 {cart.length} 个产品</p>
      </div>
    </div>
  );
};

export default ProductDashboard;
