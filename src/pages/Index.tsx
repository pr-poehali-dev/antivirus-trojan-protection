import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [scanProgress, setScanProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [threatsBlocked, setThreatsBlocked] = useState(1247);
  const [protectionStatus, setProtectionStatus] = useState('active');

  useEffect(() => {
    const interval = setInterval(() => {
      setThreatsBlocked(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const startScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white font-sans">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8 bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center animate-pulse">
              <Icon name="Shield" size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Kaspersky Antivirus</h1>
              <p className="text-sm text-gray-600">Powered by Kaspersky Engine</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge 
              variant={protectionStatus === 'active' ? 'default' : 'destructive'}
              className={protectionStatus === 'active' ? 'bg-green-500' : 'bg-red-600'}
            >
              {protectionStatus === 'active' ? 'Защищено' : 'Требует внимания'}
            </Badge>
            <Button 
              variant="outline" 
              className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
            >
              <Icon name="Download" size={16} className="mr-2" />
              Скачать
            </Button>
          </div>
        </header>

        {/* Main Protection Status */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2 border-l-4 border-l-red-600">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-800">
                <Icon name="ShieldCheck" size={24} className="mr-2 text-red-600" />
                Состояние защиты
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Антивирус</span>
                    <Badge className="bg-green-500">Активен</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Файрвол</span>
                    <Badge className="bg-green-500">Активен</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Веб-защита</span>
                    <Badge className="bg-green-500">Активна</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Защита от майнеров</span>
                    <Badge className="bg-green-500">Активна</Badge>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Защита от троянов</span>
                    <Badge className="bg-green-500">Активна</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Анти-шпионаж</span>
                    <Badge className="bg-green-500">Активен</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Родительский контроль</span>
                    <Badge variant="secondary">Настроить</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">VPN</span>
                    <Badge variant="secondary">Подключить</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-800">
                <Icon name="Activity" size={24} className="mr-2 text-green-500" />
                Статистика
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">{threatsBlocked.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Угроз заблокировано</div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Сегодня</span>
                  <span className="font-medium">47 угроз</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>На этой неделе</span>
                  <span className="font-medium">283 угрозы</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>В этом месяце</span>
                  <span className="font-medium">1,247 угроз</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Scan Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-800">
              <Icon name="Search" size={24} className="mr-2 text-red-600" />
              Сканирование системы
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Button 
                    onClick={startScan}
                    disabled={isScanning}
                    className={`bg-red-600 hover:bg-red-700 text-white ${isScanning ? 'animate-pulse' : ''}`}
                  >
                    <Icon name="Play" size={16} className="mr-2" />
                    {isScanning ? 'Сканирование...' : 'Быстрое сканирование'}
                  </Button>
                  <Button variant="outline" className="border-red-600 text-red-600">
                    <Icon name="Settings" size={16} className="mr-2" />
                    Полное сканирование
                  </Button>
                </div>
                {isScanning && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Проверено файлов:</span>
                      <span>{Math.floor((scanProgress / 100) * 125000).toLocaleString()}</span>
                    </div>
                    <Progress value={scanProgress} className="w-full" />
                    <div className="text-xs text-gray-600">
                      Сканирование: C:\Windows\System32\...
                    </div>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4 bg-green-50 border-green-200">
                  <div className="flex items-center space-x-2">
                    <Icon name="CheckCircle" size={20} className="text-green-600" />
                    <div>
                      <div className="font-medium text-green-800">Последнее сканирование</div>
                      <div className="text-sm text-green-600">Сегодня, 14:23</div>
                    </div>
                  </div>
                </Card>
                <Card className="p-4 bg-blue-50 border-blue-200">
                  <div className="flex items-center space-x-2">
                    <Icon name="RefreshCw" size={20} className="text-blue-600" />
                    <div>
                      <div className="font-medium text-blue-800">Обновление баз</div>
                      <div className="text-sm text-blue-600">Автоматически</div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feature Tabs */}
        <Tabs defaultValue="threats" className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="threats">Угрозы</TabsTrigger>
            <TabsTrigger value="quarantine">Карантин</TabsTrigger>
            <TabsTrigger value="updates">Обновления</TabsTrigger>
            <TabsTrigger value="download">Скачать</TabsTrigger>
          </TabsList>
          
          <TabsContent value="threats" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Icon name="AlertTriangle" size={24} className="mr-2 text-orange-500" />
                  Обнаруженные угрозы
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                    <div>
                      <div className="font-medium text-red-800">Trojan.Win32.CryptoMiner</div>
                      <div className="text-sm text-red-600">C:\Users\Desktop\suspicious.exe</div>
                    </div>
                    <Badge className="bg-red-600">Заблокирован</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <div>
                      <div className="font-medium text-orange-800">Spyware.Keylogger.Generic</div>
                      <div className="text-sm text-orange-600">C:\Temp\malware.dll</div>
                    </div>
                    <Badge className="bg-red-600">Удален</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div>
                      <div className="font-medium text-yellow-800">PUP.Optional.Miner</div>
                      <div className="text-sm text-yellow-600">C:\Program Files\unknown\miner.exe</div>
                    </div>
                    <Badge className="bg-red-600">В карантине</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quarantine" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Icon name="Archive" size={24} className="mr-2 text-blue-500" />
                  Карантин
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Icon name="Shield" size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Карантин пуст</h3>
                  <p className="text-gray-500">Все угрозы были успешно нейтрализованы</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="updates" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Icon name="Download" size={24} className="mr-2 text-green-500" />
                  Обновления антивирусных баз
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                    <div>
                      <div className="font-medium text-green-800">Антивирусные базы</div>
                      <div className="text-sm text-green-600">Последнее обновление: сегодня, 15:30</div>
                    </div>
                    <Badge className="bg-green-500">Актуальные</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div>
                      <div className="font-medium text-blue-800">Движок Kaspersky</div>
                      <div className="text-sm text-blue-600">Версия: 22.0.17.438</div>
                    </div>
                    <Badge className="bg-blue-500">Стабильная</Badge>
                  </div>
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                    <Icon name="RefreshCw" size={16} className="mr-2" />
                    Проверить обновления
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="download" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Icon name="Download" size={24} className="mr-2 text-red-600" />
                  Скачать Kaspersky Antivirus
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">Системные требования</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center">
                        <Icon name="Check" size={16} className="mr-2 text-green-500" />
                        Windows 10/11 (64-bit)
                      </li>
                      <li className="flex items-center">
                        <Icon name="Check" size={16} className="mr-2 text-green-500" />
                        2 ГБ RAM (рекомендуется 4 ГБ)
                      </li>
                      <li className="flex items-center">
                        <Icon name="Check" size={16} className="mr-2 text-green-500" />
                        1.5 ГБ свободного места
                      </li>
                      <li className="flex items-center">
                        <Icon name="Check" size={16} className="mr-2 text-green-500" />
                        Интернет-соединение
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">Включенная защита</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center">
                        <Icon name="Shield" size={16} className="mr-2 text-red-600" />
                        Защита от вирусов и троянов
                      </li>
                      <li className="flex items-center">
                        <Icon name="Shield" size={16} className="mr-2 text-red-600" />
                        Блокировка майнеров
                      </li>
                      <li className="flex items-center">
                        <Icon name="Shield" size={16} className="mr-2 text-red-600" />
                        Анти-шпионское ПО
                      </li>
                      <li className="flex items-center">
                        <Icon name="Shield" size={16} className="mr-2 text-red-600" />
                        Веб-защита в реальном времени
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 space-y-4">
                  <div className="p-6 bg-red-600 text-white rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold mb-2">Kaspersky Antivirus 2024</h3>
                        <p className="text-red-100">Полная защита вашего компьютера</p>
                        <p className="text-sm mt-1">Размер: 284 МБ | Версия: 22.0.17.438</p>
                      </div>
                      <div className="text-right">
                        <a 
                          href="https://www.kaspersky.ru/downloads/free-antivirus" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-block"
                        >
                          <Button 
                            size="lg" 
                            className="bg-white text-red-600 hover:bg-gray-100 border-2 border-white"
                          >
                            <Icon name="Download" size={20} className="mr-2" />
                            Скачать бесплатно
                          </Button>
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold mb-2">Рабочая версия</h3>
                        <p className="text-blue-100">Готовый к использованию антивирус</p>
                        <p className="text-sm mt-1">Размер: 156 МБ | Portable версия</p>
                      </div>
                      <div className="text-right">
                        <a 
                          href="https://disk.yandex.ru/d/AntivKasper2024" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-block"
                        >
                          <Button 
                            size="lg" 
                            className="bg-white text-blue-600 hover:bg-gray-100 border-2 border-white"
                          >
                            <Icon name="Download" size={20} className="mr-2" />
                            Скачать рабочую версию
                          </Button>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <footer className="bg-gray-800 text-white rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold mb-1">Kaspersky Antivirus</h3>
              <p className="text-sm text-gray-300">Надежная защита на основе передовых технологий</p>
            </div>
            <div className="flex space-x-4">
              <Button variant="ghost" className="text-white hover:text-red-400">
                <Icon name="HelpCircle" size={16} className="mr-2" />
                Поддержка
              </Button>
              <Button variant="ghost" className="text-white hover:text-red-400">
                <Icon name="Settings" size={16} className="mr-2" />
                Настройки
              </Button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;