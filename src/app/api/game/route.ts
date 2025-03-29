import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';

/**
 * POST /api/game
 * Erstellt ein neues Spiel, speichert es in Redis und sendet ein Kafka-Event ("GAME_CREATED").
 * Erwarteter JSON-Body:
 * {
 *   "name": "Mein Trinkspiel",
 *   "players": ["Alice", "Bob"]
 * }
 */
 /*
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Neue Spiel-ID generieren
    const newGameId = randomUUID();
    const gameData = {
      ...body,
      createdAt: Date.now()
    };

    // Speichern in Redis als Hash-Eintrag (oder als String)
    await redis.hset('games', newGameId, JSON.stringify(gameData));

    // Kafka-Event senden (optional)
   /* await sendKafkaEvent('game-events', {
      type: 'GAME_CREATED',
      gameId: newGameId,
      name: body.name,
      players: body.players,
      timestamp: Date.now()
    });

    return NextResponse.json({
      message: 'Neues Spiel erstellt und in Redis gespeichert, Kafka-Event gesendet!',
      gameId: newGameId,
    });
  } catch (error: any) {
    console.error('Fehler beim Erstellen des Spiels:', error);
    return NextResponse.json(
      { error: 'Fehler beim Erstellen des Spiels', details: error.message },
      { status: 400 }
    );
  }
}
*/

/**
 * GET /api/game
 * Gibt alle in Redis gespeicherten Spiele zurück.
 */
export async function GET() {
  try {
    // Alle Spiele als Objekt abrufen
    const games = await redis.hgetall('games');
    // Umwandeln der gespeicherten Strings in Objekte
    const parsedGames = Object.entries(games).reduce((acc, [gameId, gameData]) => {
      try {
        acc[gameId] = JSON.parse(gameData);
      } catch {
        acc[gameId] = gameData;
      }
      return acc;
    }, {} as Record<string, any>);
    return NextResponse.json({ games: parsedGames });
  } catch (error: any) {
    console.error('Fehler beim Abrufen der Spiele:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
