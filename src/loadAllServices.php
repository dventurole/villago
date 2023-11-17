<?php

require_once 'dbconfig.php';

// $arrName = array(
//     array("k0" => "v0", "k1" => "v1", ...),
//     array("k0" => "v0", "k1" => "v1", ...),
//     array("k0" => "v0", "k1" => "v1", ...));

$listProviderServices = array();

function selectAllProviderServices(&$arr) {
    global $connection;

    $sqlStatement = "SELECT P.COMPANYNAME, S.DESCRIPTION, L.NAME FROM PROVIDERSERVICE PS JOIN PROVIDER P ON P.PROVIDERID = PS.PROVIDERID JOIN SERVICE S ON S.SERVICEID = PS.SERVICEID JOIN LANGUAGE L ON L.LANGUAGEID = PS.LANGUAGEID";

    $queryId = mysqli_query($connection, $sqlStatement);
    $count = mysqli_num_rows($queryId);
    
    if ($count > 0) {
        $cpt = 0;
        while ($rec = mysqli_fetch_assoc($queryId)) {
            $arr[$cpt]["company"] = $rec["COMPANYNAME"];
            $arr[$cpt]["service"] = $rec["DESCRIPTION"];
            $arr[$cpt]["language"] = $rec["NAME"]; 
            $cpt++;
        }
    }
    
    mysqli_close($connection);
}


function displayArray($arr) {
    foreach($arr as $oneDim) {
        foreach($oneDim as $key => $value) {
            echo $key ." - ". $value ."<br>";
        }
    }
}


selectAllProviderServices($listProviderServices);
displayArray($listProviderServices);