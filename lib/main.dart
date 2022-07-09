import 'package:flutter/material.dart';
import 'package:mp_tictactoe/provider/room_data_provider.dart';
import 'package:mp_tictactoe/screems/create_room_screen.dart';
import 'package:mp_tictactoe/screems/game_screen.dart';
import 'package:mp_tictactoe/screems/join_room_screen.dart';
import 'package:mp_tictactoe/screems/main_menu_screen.dart';
import 'package:mp_tictactoe/utils/colors.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(const MyApp());
}

/*CREAR Y CONFIGURAR SERVIDOR */

//Tutorial:
//Tutorial: https://www.youtube.com/watch?v=v908ggq9ZnU

// Ctrl+Shift+P: dart:AddDependency -> socket_io_client
// Crear carpeta server en la raiz del proyecto
// Terminal -> cd server
// npm init -y
// npm i nodemon --save-dev
// npm i express http mongoose socket.io@2.4.1

// Ctrl+Shift+P: dart:AddDependency -> provider

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => RoomDataProvider(),
      child: MaterialApp(
        title: 'Flutter Demo',
        debugShowCheckedModeBanner: false,
        theme: ThemeData.dark().copyWith(scaffoldBackgroundColor: bgColor),
        routes: {
          MainMenuScreen.routeName: (context) => const MainMenuScreen(),
          JoinRoomScreen.routeName: (context) => const JoinRoomScreen(),
          CreateRoomScreen.routeName: (context) => const CreateRoomScreen(),
          GameScreen.routeName: (context) => const GameScreen(),
        },
        initialRoute: MainMenuScreen.routeName,
        //home: const MainMenuScreen(),
      ),
    );
  }
}
