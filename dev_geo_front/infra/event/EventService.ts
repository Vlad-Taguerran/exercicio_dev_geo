export class EventService {
  private eventSource: EventSource | null = null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  connect(url: string, onMessage: (data: any) => void, onError?: (error: any) => void) {
    this.eventSource = new EventSource(url);

    this.eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("📥 Dados SSE recebidos:", data);
        onMessage(data);
      } catch (error) {
        console.error("❌ Erro ao processar SSE:", error);
      }
    };

    this.eventSource.onerror = (error) => {
      console.error("❌ Erro no SSE:", error);
      this.disconnect();
      if (onError) onError(error);
    };
  }

  disconnect() {
    if (this.eventSource) {
      console.log("🛑 Desconectando SSE...");
      this.eventSource.close();
      this.eventSource = null;
    }
  }
}