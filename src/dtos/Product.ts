export interface _id {
    $oid: String;
}

export interface _createdAt {
    $date: Date;
}

export interface Product {
    _id: _id;
    name: String;
    createdAt: _createdAt;
}