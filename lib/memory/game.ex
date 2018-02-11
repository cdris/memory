defmodule Memory.Game do

  @letters ["A", "A", "B", "B", "C", "C", "D", "D",
            "E", "E", "F", "F", "G", "G", "H", "H"]
  @matched "matched"
  @unmatched "unmatched"
  @selected "selected"

  def new do
    %{
      tiles: new_tiles(),
      score: 0,
      sleeping: false
    }
  end

  def new_tiles do
    Enum.map(Enum.shuffle(@letters), fn(l) ->
      %{ letter: l, state: @unmatched }
    end)
  end

  def client_view(game) do
    %{
      tiles: Enum.map(game.tiles, fn(t) ->
        %{
          letter: if t.state == @unmatched do
            ""
          else
            t.letter
          end,
          state: t.state
        }
      end),
      score: game.score,
      sleeping: game.sleeping
    }
  end

  def mark_matched(tiles, letter) do
    Enum.map(tiles, fn(t) ->
      %{
        letter: t.letter,
        state: if t.letter == letter do
          @matched
        else
          t.state
        end
      }
    end)
  end

  def mark_unmatched(tiles) do
    Enum.map(tiles, fn(t) ->
      %{
        letter: t.letter,
        state: if t.state == @selected do
          @unmatched
        else
          t.state
        end
      }
    end)
  end

  def guess(game, l_idx) do
    cond do
      l_idx >= length(@letters) -> game
      game.sleeping -> guess(update(game), l_idx)
      true ->
        tile = Enum.at(game.tiles, l_idx)
        if tile.state == @unmatched do
          match = Enum.find(game.tiles, nil, fn(x) -> x.state == @selected end)
          if match != nil and match.letter == tile.letter do
            %{
              tiles: mark_matched(game.tiles, tile.letter),
              score: game.score + 1,
              sleeping: false
            }
          else
            %{
              tiles: List.replace_at(game.tiles, l_idx,
                                     %{letter: tile.letter, state: @selected}),
              score: game.score + 1,
              sleeping: match != nil
            }
          end
        else
          game
        end
    end
  end

  def update(game) do
    if game.sleeping do
      %{
        tiles: mark_unmatched(game.tiles),
        score: game.score,
        sleeping: false
      }
    else
      game
    end
  end
end
