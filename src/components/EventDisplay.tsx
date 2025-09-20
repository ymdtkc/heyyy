import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Calendar, Clock, MapPin, ArrowLeft } from 'lucide-react';
import { type EventData, formatDate } from '../utils/eventUtils';

interface EventDisplayProps {
  eventData: EventData;
  onBack: () => void;
}

export function EventDisplay({ eventData, onBack }: EventDisplayProps) {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center gap-4 mb-6 pt-4">
          <Button onClick={onBack} variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-lg">イベント詳細</h1>
          </div>
        </div>

        <Card className="shadow-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl">{eventData.title}</CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-5">
            {eventData.details && (
              <div className="bg-muted/30 rounded-lg p-4 space-y-2">
                <h3 className="text-sm text-muted-foreground uppercase tracking-wide">
                  詳細
                </h3>
                <p className="text-foreground leading-relaxed">
                  {eventData.details}
                </p>
              </div>
            )}

            <div className="space-y-4">
              {eventData.date && (
                <div className="flex items-center gap-3 p-3 bg-background rounded-lg border">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">日付</p>
                    <p className="text-foreground">{formatDate(eventData.date)}</p>
                  </div>
                </div>
              )}

              {eventData.timeRange && (
                <div className="flex items-center gap-3 p-3 bg-background rounded-lg border">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">時間</p>
                    <p className="text-foreground">{eventData.timeRange}</p>
                  </div>
                </div>
              )}

              {eventData.location && (
                <div className="flex items-center gap-3 p-3 bg-background rounded-lg border">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">場所</p>
                    <p className="text-foreground">{eventData.location}</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <Card className="shadow-sm">
            <CardContent className="p-4">
              <p className="text-muted-foreground">
                行けそうだったらLINEちょうだい！
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}