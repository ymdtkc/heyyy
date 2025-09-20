import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Slider } from './ui/slider';
import { generateEventUrl, type EventData } from '../utils/eventUtils';
import { Copy, Check } from 'lucide-react';

export function EventCreateForm() {
  const [formData, setFormData] = useState<EventData>({
    title: '',
    details: '',
    date: '',
    timeRange: '',
    location: ''
  });
  
  const [startTime, setStartTime] = useState([10]);
  const [endTime, setEndTime] = useState([15]);
  const [generatedUrl, setGeneratedUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);

  // Update timeRange when start or end time changes
  const updateTimeRange = (start: number, end: number) => {
    const timeRange = `${start}時〜${end}時`;
    setFormData(prev => ({ ...prev, timeRange }));
  };

  const handleStartTimeChange = (value: number[]) => {
    const newStartTime = value[0];
    setStartTime(value);
    // Ensure end time is always after start time
    if (newStartTime >= endTime[0]) {
      const newEndTime = Math.min(newStartTime + 1, 23);
      setEndTime([newEndTime]);
      updateTimeRange(newStartTime, newEndTime);
    } else {
      updateTimeRange(newStartTime, endTime[0]);
    }
  };

  const handleEndTimeChange = (value: number[]) => {
    const newEndTime = value[0];
    setEndTime(value);
    // Ensure end time is always after start time
    if (newEndTime <= startTime[0]) {
      const newStartTime = Math.max(newEndTime - 1, 0);
      setStartTime([newStartTime]);
      updateTimeRange(newStartTime, newEndTime);
    } else {
      updateTimeRange(startTime[0], newEndTime);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title) {
      alert('タイトルは必須です');
      return;
    }
    
    // Ensure timeRange is set
    if (!formData.timeRange) {
      updateTimeRange(startTime[0], endTime[0]);
    }
    
    const url = generateEventUrl({
      ...formData,
      timeRange: `${startTime[0]}時〜${endTime[0]}時`
    });
    setGeneratedUrl(url);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = generatedUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setFormData({
      title: '',
      details: '',
      date: '',
      timeRange: '',
      location: ''
    });
    setStartTime([10]);
    setEndTime([15]);
    setGeneratedUrl('');
    setCopied(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-6 pt-8">
          <h1 className="text-3xl mb-2">🎉</h1>
          <h1>友達を誘おう！</h1>
          <p className="text-muted-foreground">イベントを作成して共有URL生成</p>
        </div>

        {!generatedUrl ? (
          <Card>
            <CardHeader>
              <CardTitle>イベント作成</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">タイトル *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="例: 渋谷でカフェ巡り"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="details">詳細</Label>
                  <Textarea
                    id="details"
                    value={formData.details}
                    onChange={(e) => setFormData(prev => ({ ...prev, details: e.target.value }))}
                    placeholder="例: 新しくできたカフェに行ってみませんか？"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">日付</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  />
                </div>

                <div className="space-y-4">
                  <Label>時間</Label>
                  
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">開始時刻</span>
                        <span className="text-sm font-medium">{startTime[0]}時</span>
                      </div>
                      <Slider
                        value={startTime}
                        onValueChange={handleStartTimeChange}
                        max={22}
                        min={0}
                        step={1}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">終了時刻</span>
                        <span className="text-sm font-medium">{endTime[0]}時</span>
                      </div>
                      <Slider
                        value={endTime}
                        onValueChange={handleEndTimeChange}
                        max={23}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="text-center text-sm bg-muted/50 rounded-lg p-2">
                      <span className="font-medium">
                        {startTime[0]}時〜{endTime[0]}時
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">場所</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="例: 渋谷駅周辺"
                  />
                </div>

                <Button type="submit" className="w-full">
                  共有URLを生成
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-green-600">
                ✅ URL生成完了！
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>共有URL</Label>
                <div className="flex gap-2">
                  <Input
                    value={generatedUrl}
                    readOnly
                    className="flex-1 text-sm"
                  />
                  <Button
                    onClick={handleCopy}
                    variant="outline"
                    size="icon"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                {copied && (
                  <p className="text-sm text-green-600">コピーしました！</p>
                )}
              </div>

              <Button 
                onClick={() => window.location.href = generatedUrl} 
                className="w-full"
              >
                イベントページを確認
              </Button>

              <Button onClick={handleReset} className="w-full" variant="outline">
                新しいイベントを作成
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}